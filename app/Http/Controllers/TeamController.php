<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Display a listing of teams.
     */
    public function index(): Response
    {
        $teams = Cache::remember('teams.index', 300, function () {
            return Team::with(['creator:id,name', 'productManager:id,name', 'users:id,name,email,role_id'])
                ->select('id', 'name', 'description', 'color', 'created_by', 'product_manager_id', 'created_at')
                ->latest()
                ->limit(500)
                ->get()
                ->each(function ($team) {
                    $team->loadCount('users');
                })
                ->map(function ($team) {
                    return [
                        'id' => $team->id,
                        'name' => $team->name,
                        'description' => $team->description,
                        'color' => $team->color,
                        'members_count' => $team->users_count,
                        'creator' => $team->creator?->name,
                        'product_manager' => $team->productManager ? [
                            'id' => $team->productManager->id,
                            'name' => $team->productManager->name,
                        ] : null,
                        'members' => $team->users->take(5)->map(function ($user) {
                            return [
                                'id' => $user->id,
                                'name' => $user->name,
                                'email' => $user->email,
                                'role' => $user->role->display_name,
                            ];
                        }),
                        'created_at' => $team->created_at->format('d M Y'),
                    ];
                });
        });

        $allUsers = Cache::remember('users.for-teams', 600, function () {
            return User::with('role:id,name,display_name')
                ->select('id', 'name', 'email', 'role_id')
                ->orderBy('name')
                ->get();
        });

        return Inertia::render('teams/page', [
            'teams' => $teams,
            'allUsers' => $allUsers,
        ]);
    }

    /**
     * Store a newly created team.
     */
    public function store(Request $request): RedirectResponse
    {
        $allowedRoles = ['product_owner', 'scrum_master', 'product_manager', 'admin'];
        $userRole = $request->user()->role->name ?? null;

        if (!in_array($userRole, $allowedRoles)) {
            return back()->withErrors([
                'message' => 'You do not have permission to create teams.',
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:teams,name',
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'product_manager_id' => 'required|exists:users,id',
        ]);

        Team::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'color' => $validated['color'],
            'created_by' => $request->user()->id,
            'product_manager_id' => $validated['product_manager_id'],
        ]);

        Cache::forget('teams.index');

        return back()->with('success', 'Team created successfully!');
    }

    /**
     * Update the specified team.
     */
    public function update(Request $request, Team $team): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:teams,name,' . $team->id,
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'product_manager_id' => 'required|exists:users,id',
        ]);

        $team->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'color' => $validated['color'],
            'product_manager_id' => $validated['product_manager_id'],
        ]);

        Cache::forget('teams.index');

        return back()->with('success', 'Team updated successfully!');
    }

    /**
     * Add a member to a team.
     */
    public function addMember(Request $request, Team $team): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        if ($team->users()->where('user_id', $validated['user_id'])->exists()) {
            return back()->withErrors([
                'user_id' => 'This user is already a member of the team.',
            ]);
        }

        $team->users()->attach($validated['user_id']);

        Cache::forget('teams.index');

        return back()->with('success', 'Member added successfully!');
    }

    /**
     * Remove a member from a team.
     */
    public function removeMember(Team $team, User $user): RedirectResponse
    {
        if (!$team->users()->where('user_id', $user->id)->exists()) {
            return back()->withErrors([
                'message' => 'This user is not a member of the team.',
            ]);
        }

        $team->users()->detach($user->id);

        Cache::forget('teams.index');

        return back()->with('success', 'Member removed successfully!');
    }
}
