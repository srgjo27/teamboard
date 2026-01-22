<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Display a listing of teams.
     */
    public function index(): Response
    {
        $teams = Team::with(['creator', 'users'])
            ->withCount('users')
            ->latest()
            ->get()
            ->map(function ($team) {
                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'description' => $team->description,
                    'color' => $team->color,
                    'members_count' => $team->users_count,
                    'creator' => $team->creator ? [
                        'id' => $team->creator->id,
                        'name' => $team->creator->name,
                    ] : null,
                    'members' => $team->users->take(5)->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                        ];
                    }),
                    'created_at' => $team->created_at->format('d M Y'),
                ];
            });

        $allUsers = User::with('role')
            ->select('id', 'name', 'email', 'role_id')
            ->orderBy('name')
            ->get();

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
        $allowedRoles = ['product_owner', 'scrum_master', 'project_manager', 'admin'];
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
        ]);

        Team::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'color' => $validated['color'],
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Team created successfully!');
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

        return back()->with('success', 'Member added successfully!');
    }
}
