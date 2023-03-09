<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\General\HomeController;
use App\Http\Controllers\General\ProfileController;

Route::middleware(['guest'])->group(function () {
    Route::controller(HomeController::class)->group(function () {
        Route::get('/', 'index')->name('root');
        Route::get('/home', 'index')->name('home');
    });
});

/**
 * Temporary guest route
 */
Route::middleware(['guest'])->group(function () {
    Route::controller(ProfileController::class)->group(function() {
        Route::get('/user/{username}', 'viewProfile')->where('username', '[a-zA-Z0-9_]+')->name('profile.view');
    });
});

//Authentication Routes
require __DIR__.'/auth.php';
//Conversations Routes
require __DIR__.'/conversation.php';
