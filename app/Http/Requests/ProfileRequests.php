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
        $host = User::find(Auth::guard()->user()->id); //This is the loaded profile by current user
        $blockedBy = $host->blockedBy;
        $blockedBy = $host->blockedBy->map(function($item) {
            return $item->blocked_user_id;
        }); //This is situation if profile owner blocked the current user (the user who is viewing the profile)

        return in_array(Auth::guard()->user()->id, $blockedBy->toArray()) ? true : false;
    }

    public static function blockList($username) {
        $user_id = Auth::guard('web')->user()->id;
        $host = User::where('username', $username)->first();
        $blocks = Block::where('user_id', $user_id)->where('blocked_user_id', $host->id)->first();
        $blockedUsers = !empty($blocks) ? $blocks->blockedUsers : [];

        return $blockedUsers;
    }

    public static function canBlock($username) {
        $blocklist = self::blockList($username);
        return empty($blocklist) ? true : false;
    }

    public static function canUnblock($username) {
        $blocklist = self::blockList($username);
        return empty($blocklist) ? true : false;
    }

    public static function followers() {
        $user = User::find(Auth::guard('web')->user()->id);
        $contacts = $user->followers;

        return $contacts;
    }

    public static function followings() {
        $user = User::find(Auth::guard('web')->user()->id);

        return $user->followings;
    }

    public static function canFollow($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $hostRequest = static::followers()->where('id', $host->id)->pluck('pivot.status');
        $canFollow = static::followings()->where('id', $host->id)->pluck('pivot.status');
        return !$hostRequest->contains('pending') && ($canFollow->contains('rejected') || $canFollow->contains('cancelled') || empty(static::followings()->toArray())) ? true : false;
    }

    public static function canUnfollow($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canUnfollow = static::followings()->where('id', $host->id)->pluck('pivot.status');
        return $canUnfollow->contains('accepted') ? true : false;
    }

    public static function canCancelRequest($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canUnfollow = static::followings()->where('id', $host->id)->pluck('pivot.status');
        return $canUnfollow->contains('pending') ? true : false;
    }

    public static function canReject($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canReject = static::followers()->where('id', $host->id)->pluck('pivot.status');
        return $canReject->contains('pending') ? true : false;
    }
}
