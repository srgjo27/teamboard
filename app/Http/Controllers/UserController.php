<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search');
        $role = $request->get('role');

        $query = User::with('role')
            ->select('id', 'name', 'email', 'role_id', 'created_at');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role && $role !== 'all') {
            $query->whereHas('role', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }

        $users = $query->latest()
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ? [
                        'id' => $user->role->id,
                        'name' => $user->role->name,
                        'display_name' => $user->getRoleDisplayName(),
                    ] : null,
                    'created_at' => $user->created_at->format('d M Y'),
                ];
            });

        $roles = Cache::remember('roles.all', 3600, function () {
            return Role::all(['id', 'name', 'display_name']);
        });

        $stats = [
            'total' => User::count(),
            'admins' => User::whereHas('role', function ($q) {
                $q->where('name', 'admin');
            })->count(),
            'roles' => Role::count(),
        ];

        return Inertia::render('manage-users/page', [
            'users' => $users,
            'roles' => $roles,
            'stats' => $stats
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    /**
     * Update the user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Update the user's role.
     */
    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        $oldRole = $user->role?->display_name ?? 'No Role';

        $user->update([
            'role_id' => $validated['role_id']
        ]);

        $user->load('role');
        $newRole = $user->role->display_name;

        $user->notify(new \App\Notifications\RoleAssignedNotification(
            $oldRole,
            $newRole,
            $request->user()->name
        ));

        return redirect()->back()->with('success', 'User role updated successfully.');
    }

    /**
     * Delete the user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->id === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
