<?php

use App\Http\Controllers\Conversations\Dashboard;
use Illuminate\Support\Facades\Route;


// Conversation routes
Route::middleware(['guest'])->group(function() {
    Route::controller(Dashboard::class)->group(function () {
        Route::get('/messages', 'index')->name('conversations');
    });
});