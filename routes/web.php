<?php

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

    Route::get('manage-users', [UserController::class, 'index'])->name('manage-users');

    Route::get('teams', function () {
        return Inertia::render('teams/page');
    })->name('teams');

    Route::get('timelines', function () {
        return Inertia::render('timelines/page');
    })->name('timelines');

    Route::get('tikets', function () {
        return Inertia::render('tikets/page');
    })->name('tikets');
    
    Route::get('projects', function () {
        return Inertia::render('projects/page');
    })->name('projects');
});

require __DIR__.'/settings.php';
