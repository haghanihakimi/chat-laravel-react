<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('user.{userId}', function ($user, $userId) {
    return $user->id === (int)$userId;
});
