<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('followRequest.{userId}', function ($user, $userId) {
    return $user->id === (int)$userId;
});
