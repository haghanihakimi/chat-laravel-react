<?php

namespace App\Http\Requests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Block;
use App\Models\Contact;
use Carbon\Carbon;
use Inertia\Inertia;

class ProfileRequests
{
    public static function blockedBy($username) {
        $host = User::where('username', $username)->first(); //This is the loaded profile by current user
        $blockedBy = $host->blockedBy; //This is situation if profile owner blocked the current user (the user who is viewing the profile)

        return $blockedBy;
    }

    public static function blocked($username) {
        $user_id = Auth::guard('web')->user()->id;
        $blocks = Block::where('user_id', $user_id)->where('blocked_user_id', $host->id)->first();
        $blockedUsers = $blocks->blockedUsers;

        return $blockedUsers;
    }
}
