<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\General\HomeController;
use App\Http\Controllers\General\ProfileController;
use App\Http\Controllers\General\ContactsController;

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
        Route::patch('/account/save/settings/general', 'saveNames')->name('settings.save.names');
        Route::patch('/account/save/settings/privacy', 'saveEmail')->name('settings.save.email');
        Route::patch('/account/save/settings/security', 'savePassword')->name('settings.save.password');
        Route::post('/account/change/profile/image', 'uploadProfileImage')->name('change.profile.image');
    });
});

// User Search routes
Route::middleware(['auth'])->group(function() {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/search/account', 'searchUsers')->name('user.search');
    });
});

//Contacts Routes
Route::middleware(['auth'])->group(function() {
    Route::controller(ContactsController::class)->group(function () {
        Route::post('/user/send/follow/request/{username}', 'sendFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('send.follow.request');
        Route::patch('/user/accept/follow/request/{username}', 'acceptFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('accept.follow.request');
        Route::patch('/user/cancel/follow/request/{username}', 'cancelFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('cancel.follow.request');
        Route::patch('/user/unfollow/{username}', 'unFollow')->where('username', '[a-zA-Z0-9_]+')->name('unfollow.following');
        Route::patch('/user/remove/follower/{username}', 'removeFollower')->where('username', '[a-zA-Z0-9_]+')->name('remove.follower');
        Route::patch('/user/reject/follower/request/{username}', 'rejectFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('reject.follower.request');
        Route::patch('/user/ignore/follower/request/{username}', 'spamFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('ignore.follower.request');
        Route::patch('/user/unignore/follower/request/{username}', 'unSpamFollowRequest')->where('username', '[a-zA-Z0-9_]+')->name('unignore.follower.request');
        Route::post('/user/block/{username}', 'blockUser')->where('username', '[a-zA-Z0-9_]+')->name('block.user');
        Route::post('/user/unblock/{username}', 'unBlockUser')->where('username', '[a-zA-Z0-9_]+')->name('unblock.user');
        Route::get('/user/abilities/{username}', 'getAbilities')->where('username', '[a-zA-Z0-9_]+')->name('user.abilities');
        Route::get('/list/blocked/users', 'getBlockedUsers')->name('get.blocked.users');
        Route::get('/list/spammed/users', 'getSpammedUsers')->name('get.spammed.users');
        Route::get('/list/followers', 'getFollowers')->name('user.followers');
        Route::get('/list/followings', 'getFollowings')->name('user.followings');
        Route::get('/list/requests/follower', 'getFollowerRequests')->name('user.follower.requests');
        Route::get('/list/requests/following', 'getFollowingRequests')->name('user.following.requests');
        Route::get('/count/incoming/following/requests', 'countPendingRequests')->name('count.incoming.follower.requests');
    });
});

//Authentication Routes
require __DIR__.'/auth.php';
//Conversations Routes
require __DIR__.'/conversation.php';
