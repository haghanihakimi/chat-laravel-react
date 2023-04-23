<?php

use App\Http\Controllers\Conversations\Dashboard;
use App\Http\Controllers\Conversations\MessagesController;
use Illuminate\Support\Facades\Route;


// Conversation routes
Route::middleware(['auth'])->group(function() {
    Route::controller(Dashboard::class)->group(function () {
        Route::get('/messages', 'index')->name('conversations');
    });
    /**
     * Message Routes
     */
    Route::controller(MessagesController::class)->group(function() {
        Route::get('/message/{username}', 'index')->where('username', '[a-zA-Z0-9_]+')->name('messages.view');
        Route::get('/messages/fetch/messages/{username}', 'getMessages')->where('username', '[a-zA-Z0-9_]+')->name('get.messages');
        Route::delete("/oneway/delete/single/message/{chat}/{user}/{host}", "removeSingleMessageOneWay")
        ->where('chat', '[0-9]+')
        ->where('user', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('delete.single.message.oneway');
    });
});