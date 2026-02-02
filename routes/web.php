<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TicketCommentController;
use App\Http\Controllers\TicketController;
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
    Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics');
    Route::post('analytics/ai-analysis', [AnalyticsController::class, 'generateAIAnalysis'])->name('analytics.ai-analysis');

    Route::get('projects', [ProjectController::class, 'index'])->name('projects');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');

    Route::get('tickets', [TicketController::class, 'index'])->name('tickets');
    Route::post('tickets', [TicketController::class, 'store'])->name('tickets.store');
    Route::put('tickets/{ticket}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy');

    Route::post('tickets/{ticket}/comments', [TicketCommentController::class, 'store'])->name('tickets.comments.store');
    Route::put('tickets/comments/{comment}', [TicketCommentController::class, 'update'])->name('tickets.comments.update');
    Route::delete('tickets/comments/{comment}', [TicketCommentController::class, 'destroy'])->name('tickets.comments.destroy');

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

    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::post('notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::delete('notifications/clear-all', [NotificationController::class, 'destroyAll'])->name('notifications.clear-all');

    Route::get('archive', [ArchiveController::class, 'index'])->name('archive');
});

require __DIR__.'/settings.php';
