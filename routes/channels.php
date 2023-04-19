<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('home', function ($id) {
    // return $user->id === (int)$userId;
    return true;
});
