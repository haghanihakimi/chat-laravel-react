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
        Route::post('/account/save/settings/general', 'saveNames')->name('settings.save.names');
        Route::post('/account/save/settings/privacy', 'saveEmail')->name('settings.save.email');
        Route::post('/account/save/settings/security', 'savePassword')->name('settings.save.password');
    });
});

//Authentication Routes
require __DIR__.'/auth.php';
//Conversations Routes
require __DIR__.'/conversation.php';
