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
        
        Route::delete("/oneway/delete/single/message/{chat}/{host}", "removeSingleMessageOneWay")
        ->where('chat', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('delete.single.message.oneway');

        Route::delete("/twoway/delete/single/message/{chat}/{host}", "removeSingleMessageTwoWay")
        ->where('chat', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('delete.single.message.twoway');

        Route::post("/conversation/send/new/message/{username}", "sendMessageOneToOne")
        ->where('username', '[a-zA-Z0-9_]+')
        ->name('send.new.one.to.one.message');

        Route::post("/conversation/seen/message/{username}", "seenOneToOneMessage")
        ->where('username', '[a-zA-Z0-9_]+')
        ->name('seen.one.to.one.message');

        Route::patch("/conversation/pin/message/{chat}/{message}/{host}/", "pinOneToOneMessage")
        ->where('chat', '[0-9]+')
        ->where('message', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('pin.message');        

        Route::get("/conversation/pinned/messages/{username}", "getOneToOneMessages")
        ->where('username', '[a-zA-Z0-9_]+')
        ->name('get.pinned.messages');

        Route::get("/conversation/count/messages/{username}", "countPinnedOneToOneMessages")
        ->where('username', '[a-zA-Z0-9_]+')
        ->name('count.pinned.messages');
    });
});