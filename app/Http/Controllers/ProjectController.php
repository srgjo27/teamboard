<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(): Response
    {
        $projects = Cache::remember('projects.index', 300, function () {
            return Project::with([
                'team:id,name,color',
                'team.users:id,name',
                'projectManager:id,name',
                'creator:id,name'
            ])
                ->whereIn('status', ['planning', 'in_progress', 'on_hold'])
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
                        'created_at' => $project->created_at->format('d M Y'),
                        'file_path' => $project->file_path,
                        'file_name' => $project->file_name,
                        'image_path' => $project->image_path,
                        'image_name' => $project->image_name,
                    ];
                });
        });

        $teams = Cache::remember('teams.for-projects', 600, function () {
            return Team::with('productManager:id,name')
                ->select('id', 'name', 'color', 'product_manager_id')
                ->orderBy('name')
                ->get();
        });

        $allUsers = Cache::remember('users.for-projects', 600, function () {
            return User::with('role:id,name,display_name')
                ->select('id', 'name', 'email', 'role_id')
                ->orderBy('name')
                ->get();
        });

        return Inertia::render('projects/page', [
            'projects' => $projects,
            'teams' => $teams,
            'allUsers' => $allUsers,
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): RedirectResponse
    {
        $allowedRoles = ['product_owner', 'product_manager', 'admin'];
        $userRole = $request->user()->role->name ?? null;

        if (!in_array($userRole, $allowedRoles)) {
            return back()->withErrors([
                'message' => 'You do not have permission to create projects.',
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:projects,name',
            'description' => 'nullable|string|max:1000',
            'team_id' => 'required|exists:teams,id',
            'project_manager_id' => 'required|exists:users,id',
            'status' => 'required|in:planning,in_progress,on_hold,completed,cancelled',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'file' => 'nullable|file|mimes:doc,docx,pdf|max:20480',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:10240',
        ]);

        $filePath = null;
        $fileName = null;
        $imagePath = null;
        $imageName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('projects/files', $fileName, 'public');
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('projects/images', $imageName, 'public');
        }

        Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'team_id' => $validated['team_id'],
            'project_manager_id' => $validated['project_manager_id'],
            'status' => $validated['status'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'created_by' => $request->user()->id,
            'file_path' => $filePath,
            'file_name' => $fileName,
            'image_path' => $imagePath,
            'image_name' => $imageName,
        ]);

        Cache::forget('projects.index');

        return back()->with('success', 'Project created successfully!');
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $allowedRoles = ['product_owner', 'product_manager', 'admin'];
        $userRole = $request->user()->role->name ?? null;

        if (!in_array($userRole, $allowedRoles)) {
            return back()->withErrors([
                'message' => 'You do not have permission to update projects.',
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:projects,name,' . $project->id,
            'description' => 'nullable|string|max:1000',
            'team_id' => 'required|exists:teams,id',
            'project_manager_id' => 'required|exists:users,id',
            'status' => 'required|in:planning,in_progress,on_hold,completed,cancelled',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'file' => 'nullable|file|mimes:doc,docx,pdf|max:20480',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:10240',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'description' => $validated['description'],
            'team_id' => $validated['team_id'],
            'project_manager_id' => $validated['project_manager_id'],
            'status' => $validated['status'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ];

        if ($request->hasFile('file')) {
            if ($project->file_path) {
                Storage::disk('public')->delete($project->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('projects/files', $fileName, 'public');

            $updateData['file_path'] = $filePath;
            $updateData['file_name'] = $fileName;
        }

        if ($request->hasFile('image')) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('projects/images', $imageName, 'public');

            $updateData['image_path'] = $imagePath;
            $updateData['image_name'] = $imageName;
        }

        $project->update($updateData);

        Cache::forget('projects.index');

        return back()->with('success', 'Project updated successfully!');
    }
}
