<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('analytics', function () {
        return Inertia::render('analytics/page');
    })->name('analytics');

    Route::get('projects', [ProjectController::class, 'index'])->name('projects');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');

    Route::get('tikets', function () {
        return Inertia::render('tikets/page');
    })->name('tikets');

    Route::get('timelines', [TimelineController::class, 'index'])->name('timelines');
    Route::post('timelines', [TimelineController::class, 'store'])->name('timelines.store');
    Route::put('timelines/{timeline}', [TimelineController::class, 'update'])->name('timelines.update');
    Route::delete('timelines/{timeline}', [TimelineController::class, 'destroy'])->name('timelines.destroy');

    Route::get('teams', [TeamController::class, 'index'])->name('teams');
    Route::post('teams', [TeamController::class, 'store'])->name('teams.store');
    Route::put('teams/{team}', [TeamController::class, 'update'])->name('teams.update');
    Route::post('teams/{team}/members', [TeamController::class, 'addMember'])->name('teams.add-member');
    Route::delete('teams/{team}/members/{user}', [TeamController::class, 'removeMember'])->name('teams.remove-member');

    Route::middleware(['role:admin'])->group(function () {
        Route::get('manage-users', [UserController::class, 'index'])->name('manage-users');
        Route::post('manage-users', [UserController::class, 'store'])->name('manage-users.store');
        Route::put('manage-users/{user}', [UserController::class, 'update'])->name('manage-users.update');
        Route::put('manage-users/{user}/role', [UserController::class, 'updateRole'])->name('manage-users.update-role');
        Route::delete('manage-users/{user}', [UserController::class, 'destroy'])->name('manage-users.destroy');
    });
});

require __DIR__.'/settings.php';
