<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TicketCommentController extends Controller
{
    public function store(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:5000',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240', // 10MB max per file
            'type' => 'nullable|in:comment,status_change,assignment_change,system',
            'is_internal' => 'nullable|boolean',
        ]);

        $attachmentPaths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('ticket-comments', 'public');
                $attachmentPaths[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ];
            }
        }

        $comment = $ticket->comments()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'],
            'attachments' => !empty($attachmentPaths) ? $attachmentPaths : null,
            'type' => $validated['type'] ?? 'comment',
            'is_internal' => $validated['is_internal'] ?? false,
        ]);

        $comment->load('user');

        return redirect()->back()->with('success', 'Comment added successfully');
    }

    public function update(Request $request, TicketComment $comment)
    {
        if ($comment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'comment' => 'required|string|max:5000',
            'is_internal' => 'nullable|boolean',
        ]);

        $comment->update([
            'comment' => $validated['comment'],
            'is_internal' => $validated['is_internal'] ?? $comment->is_internal,
        ]);

        return redirect()->back()->with('success', 'Comment updated successfully');
    }

    public function destroy(TicketComment $comment)
    {
        if ($comment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        if ($comment->attachments) {
            foreach ($comment->attachments as $attachment) {
                if (isset($attachment['path'])) {
                    Storage::disk('public')->delete($attachment['path']);
                }
            }
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully');
    }
}
