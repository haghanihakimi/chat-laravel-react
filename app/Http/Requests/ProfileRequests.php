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
    public static function blockedBy() {
        $user = User::find(Auth::guard('web')->user()->id);

        return $user->blocks;
    }

    public static function blockList() {
        $user = User::find(Auth::guard('web')->user()->id);

        return $user->blockedBy;
    }

    public static function canBlock($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canBlock = !empty(static::blockList()) ? static::blockList()->where('pivot.blocked_user_id', $host->id)->pluck('pivot.is_blocked') : [];
        return count($canBlock) == 0 || $canBlock->contains(false); // empty($canBlock) && $canBlock->contains(false);
    }

    public static function canUnblock($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canUnblock = static::blockList()->where('pivot.blocked_user_id', $host->id)->pluck('pivot.is_blocked');
        return !empty($canUnblock) && $canUnblock->contains(true);
    }

    public static function isBlocked($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false; 
        }
        $blocked = static::blockedBy()
        ->where('pivot.user_id', $host->id)
        ->where('pivot.blocked_user_id', Auth::guard()->user()->id)->pluck('pivot.is_blocked');
        return !empty($blocked) && $blocked->contains(true);
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
        
        $hasSentPendingFollowRequest = static::followings()
        ->where('id', $host->id)
        ->pluck('pivot.status')
        ->contains('pending');

        $hasSentAcceptedFollowRequest = static::followings()
        ->where('id', $host->id)
        ->pluck('pivot.status')
        ->contains('accepted');

        $hasSentSpamFollowRequest = static::followings()
        ->where('id', $host->id)
        ->pluck('pivot.status')
        ->contains('spam');

        $isBlocked = self::isBlocked($username);
        $canBlock = self::canBlock($username);


        $canFollow = !$hasSentPendingFollowRequest && 
        !$hasSentAcceptedFollowRequest && 
        !$isBlocked && $canBlock && 
        !$hasSentSpamFollowRequest;

        return $canFollow;
    }

    public static function canUnfollow($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canUnfollow = static::followings()->where('id', $host->id)->pluck('pivot.status');
        return $canUnfollow->contains('accepted') ? true : false;
    }

    public static function canRemove($username) {
        $host = User::where('username', $username)->first();
        if (!$host) {
            return false;
        }
        $canUnfollow = static::followers()->where('id', $host->id)->pluck('pivot.status');
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
