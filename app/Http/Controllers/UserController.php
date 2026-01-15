<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(): Response
    {
        $users = User::with('role')
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ? [
                        'name' => $user->role->name,
                        'display_name' => $user->getRoleDisplayName(),
                    ] : null,
                    'created_at' => $user->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('manage-users/page', [
            'users' => $users
        ]);
    }
}
