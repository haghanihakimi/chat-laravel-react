<?php

use App\Http\Controllers\Conversations\Dashboard;
use App\Http\Controllers\Conversations\MessagesController;
use Illuminate\Support\Facades\Route;


// Conversation routes
Route::middleware(['guest'])->group(function() {
    Route::controller(Dashboard::class)->group(function () {
        Route::get('/messages', 'index')->name('conversations');
    });
    /**
     * Message Routes
     */
    Route::controller(MessagesController::class)->group(function() {
        Route::get('/message/{message_id}', 'index')->whereNumber('message_id')->name('messages.view');
    });
});