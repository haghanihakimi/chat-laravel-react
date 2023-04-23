<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('followerRequest.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('cancelFollowRequest.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});
