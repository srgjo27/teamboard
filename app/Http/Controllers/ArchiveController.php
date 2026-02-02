<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ArchiveController extends Controller
{
    /**
     * Display a listing of archived projects.
     */
    public function index(Request $request): Response
    {
        $projects = Cache::remember('projects.archive', 300, function () {
            return Project::with([
                'team:id,name,color',
                'team.users:id,name',
                'projectManager:id,name',
                'creator:id,name',
                'tickets.assignedUser',
                'timelines'
            ])
                ->whereIn('status', ['completed', 'cancelled'])
                ->select(
                    'id',
                    'name',
                    'description',
                    'team_id',
                    'project_manager_id',
                    'status',
                    'start_date',
                    'end_date',
                    'created_by',
                    'created_at',
                    'updated_at',
                    'file_path',
                    'file_name',
                    'image_path',
                    'image_name'
                )
                ->latest()
                ->limit(500)
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'name' => $project->name,
                        'description' => $project->description,
                        'status' => $project->status,
                        'start_date' => $project->start_date?->format('Y-m-d'),
                        'end_date' => $project->end_date?->format('Y-m-d'),
                        'team' => [
                            'id' => $project->team->id,
                            'name' => $project->team->name,
                            'color' => $project->team->color,
                            'members_count' => $project->team->users->count(),
                            'members' => $project->team->users->take(6)->map(function ($user) {
                                return [
                                    'id' => $user->id,
                                    'name' => $user->name,
                                ];
                            }),
                        ],
                        'project_manager' => [
                            'id' => $project->projectManager->id,
                            'name' => $project->projectManager->name,
                        ],
                        'creator' => $project->creator?->name,
                        'updated_at' => $project->updated_at->format('d M Y'),
                        'file_path' => $project->file_path,
                        'file_name' => $project->file_name,
                        'image_path' => $project->image_path,
                        'image_name' => $project->image_name,
                        'tickets' => $project->tickets,
                        'timelines' => $project->timelines,
                    ];
                });
        });

        return Inertia::render('archive/page', [
            'projects' => $projects,
        ]);
    }
}
