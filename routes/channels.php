<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('followerRequest.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('block.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('cancelFollowRequest.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('deleteTwoWayMessage.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('sendOneToOneMessage.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('seenOneToOneMessage.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('message.reaction.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});

Broadcast::channel('pin.message.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id ? true : false;
});