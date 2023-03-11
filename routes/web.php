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

// Settings & Profile routes
Route::middleware(['auth'])->group(function () {
    Route::controller(ProfileController::class)->group(function() {
        Route::get('/user/{username}', 'viewProfile')->where('username', '[a-zA-Z0-9_]+')->name('profile.view');
        Route::get('/account/settings', 'settingsView')->name('settings.view');
        Route::patch('/account/save/settings', 'save')->name('settings.save');
    });
});

//Authentication Routes
require __DIR__.'/auth.php';
//Conversations Routes
require __DIR__.'/conversation.php';
