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
        Route::get('/list/conversations', 'getConversations')->name('get.conversations');
        
        Route::delete("/oneway/delete/single/message/{chat}/{host}", "removeSingleMessageOneWay")
        ->where('chat', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('delete.single.message.oneway');

        Route::delete("/remove/received/message/{chat}/{host}", "removeReceivedMessage")
        ->where('chat', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('remove.received.message');

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

        Route::patch("/conversation/unpin/message/{chat}/{message}/{host}/", "unPinOneToOneMessage")
        ->where('chat', '[0-9]+')
        ->where('message', '[0-9]+')
        ->where('host', '[0-9]+')
        ->name('unpin.message');

        Route::get("/conversation/count/messages/{username}", "countPinnedOneToOneMessages")
        ->where('username', '[a-zA-Z0-9_]+')
        ->name('count.pinned.messages');
        
        Route::get("/count/unread/conversations", "countUnreadConversations")
        ->name('count.unread.conversations');

        Route::post("/conversation/like/messages/{chat}/{message}/{host}/{reaction}", "messageReaction")
        ->where('chat', '[0-9]+')
        ->where('message', '[0-9]+')
        ->where('host', '[0-9]+')
        ->whereIn('reaction', ['like', 'dislike', 'love'])
        ->name('like.message');

        Route::post("/conversation/like/messages/{host}/{conversation}", "removeConversation")
        ->where('host', '[0-9]+')
        ->where('conversation', '[0-9]+')
        ->name('remove.conversation');
    });
});