<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectTimeline;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use App\Models\User;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $query = Ticket::with([
            'project:id,name,status',
            'timeline:id,title,type',
            'reporter:id,name',
            'assignedUser:id,name',
            'qaAssignedUser:id,name',
            'comments.user:id,name',
        ]);

        if ($request->has('project_id') && $request->project_id !== 'all') {
            $query->where('project_id', $request->project_id);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('ticket_number', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }

        $tickets = $query->whereHas('project', function ($q) {
                $q->whereNotIn('status', ['cancelled', 'completed']);
            })
            ->orderBy('created_at', 'desc')->get();

        $projects = Project::with(['team.users:id,name'])
            ->select('id', 'name', 'status', 'team_id')
            ->whereNotIn('status', ['cancelled', 'completed'])
            ->orderBy('name')
            ->get();

        $timelines = ProjectTimeline::select('id', 'project_id', 'title', 'type', 'status')
            ->whereIn('status', ['pending', 'in_progress'])
            ->orderBy('created_at', 'desc')
            ->get();

        $allUsers = Cache::remember('users.for-tickets', 600, function () {
            return User::with('role:id,name,display_name')
                ->select('id', 'name', 'email', 'role_id')
                ->orderBy('name')
                ->get();
        });

        return Inertia::render('tickets/page', [
            'tickets' => $tickets,
            'projects' => $projects,
            'timelines' => $timelines,
            'allUsers' => $allUsers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'timeline_id' => 'nullable|exists:project_timelines,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:bug,feature,task,improvement,documentation',
            'priority' => 'required|in:highest,high,medium,low,lowest',
            'status' => 'nullable|in:backlog,todo,pending,inprogress,qa-ready,qa-test,review,done',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|numeric|min:0',
            'story_points' => 'nullable|integer|min:0',
            'tags' => 'nullable|array',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        $lastTicket = Ticket::where('project_id', $project->id)
            ->orderBy('id', 'desc')
            ->first();
        
        $ticketCount = $lastTicket ? ((int) explode('-', $lastTicket->ticket_number)[1] ?? 0) + 1 : 1;
        $validated['ticket_number'] = strtoupper(substr($project->name, 0, 4)) . '-' . str_pad($ticketCount, 3, '0', STR_PAD_LEFT);
        
        $validated['reporter_id'] = $request->user()->id;
        $validated['status'] = $validated['status'] ?? 'backlog';

        if ($request->hasFile('attachments')) {
            $attachmentPaths = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('ticket-attachments', 'public');
                $attachmentPaths[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ];
            }
            $validated['attachments'] = $attachmentPaths;
        }

        $ticket = Ticket::create($validated);

        return redirect()->back()->with('success', 'Ticket created successfully');
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|in:bug,feature,task,improvement,documentation',
            'priority' => 'sometimes|in:highest,high,medium,low,lowest',
            'status' => 'sometimes|in:backlog,todo,pending,inprogress,qa-ready,qa-test,review,done',
            'assigned_to' => 'nullable|exists:users,id',
            'qa_assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|numeric|min:0',
            'actual_hours' => 'nullable|numeric|min:0',
            'story_points' => 'nullable|integer|min:0',
            'tags' => 'nullable|array',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
        ]);

        if (isset($validated['status']) && $validated['status'] !== $ticket->status) {
            if ($validated['status'] === 'done') {
                $validated['resolved_at'] = now();
                $validated['closed_at'] = now();
            }
        }

        if ($request->hasFile('attachments')) {
            $existingAttachments = $ticket->attachments ?? [];
            $newAttachments = [];
            
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('ticket-attachments', 'public');
                $newAttachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ];
            }
            
            $validated['attachments'] = array_merge($existingAttachments, $newAttachments);
        }

        $ticket->update($validated);

        return redirect()->back()->with('success', 'Ticket updated successfully');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->back()->with('success', 'Ticket deleted successfully');
    }
}
