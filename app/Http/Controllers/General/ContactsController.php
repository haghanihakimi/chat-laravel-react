<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\ProfileRequests as Abilities;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use App\Models\User;
use App\Models\Contact;
use App\Models\Block;
use App\Events\SendFollowRequest as FollowRequestEvent;
use App\Events\CancelFollowRequest as CancelFollowRequestEvent;
use App\Events\BlockEvent;

class ContactsController extends Controller
{
    public function sendFollowRequest($username) {
        if(!Abilities::isBlocked($username) && Abilities::canFollow($username)) {
            $host = User::where('username', $username)->first();
            $user = User::find(Auth::guard('web')->user()->id);
            if ($host) {
                $contact = Contact::updateOrCreate(
                ['user_id' => $user->id, 'contact_id' => $host->id],
                ['status' => $host->privacy ? 'pending' : 'accepted']);
                if($contact) {
                    if($contact->status === "pending"): event(new FollowRequestEvent($host, $user)); endif;
                    return back()->with('message', ['followRequest' => "Follow request has been sent."]);
                }
                return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
            }
            return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
        }
        return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
    }

    public function acceptFollowRequest($username) {
        if(!Abilities::isBlocked($username) && Abilities::canReject($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('contact_id', Auth::guard()->user()->id)
            ->where('user_id', $host->id)
            ->where('status', 'pending')->first();
            if ($host && $request) {
                $request->status = 'accepted';
                $request->save();
                return back()->with('message', ['acceptRequest' => "You accepted ".$host->username." follow request."]);
            }
            return back()->with('message', ['acceptRequest' => "OOPS! Sorry, something went wrong with accepting the request. Please try again later."]);
        }
        return back()->with('message', ['acceptRequest' => "Invalid action..."]);
    }

    public function rejectFollowRequest($username) {
        if(!Abilities::isBlocked($username) && Abilities::canReject($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('contact_id', Auth::guard()->user()->id)
            ->where('user_id', $host->id)
            ->where('status', 'pending')->first();
            if ($host && $request) {
                $request->status = 'rejected';
                $request->save();
                return back()->with('message', ['rejectRequest' => "You rejected ".$host->username." follow request."]);
            }
            return back()->with('message', ['rejectRequest' => "OOPS! Sorry, something went wrong with rejecting the request. Please try again later."]);
        }
        return back()->with('message', ['rejectRequest' => "OOPS! Sorry, something went wrong with rejecting the request. Please try again later."]);
    }

    public function spamFollowRequest($username) {
        if(!Abilities::isBlocked($username) && Abilities::canReject($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('contact_id', Auth::guard()->user()->id)
            ->where('user_id', $host->id)
            ->where('status', 'pending')->first();
            if ($host && $request) {
                $request->status = 'spam';
                $request->save();
                return back()->with('message', ['ignoreRequest' => "You marked ".$host->username." as spam. They cannot send you any more follow request."]);
            }
            return back()->with('message', ['ignoreRequest' => "OOPS! Sorry, something went wrong with ignoring ".$host->username.". Please try again later."]);
        }
        return back()->with('message', ['ignoreRequest' => "OOPS! Sorry, something went wrong with ignoring this user. Please try again later."]);
    }

    public function unSpamFollowRequest($username) {
        $user = Auth::guard()->user();
        $host = User::where('username', $username)->first();
        
        if(Abilities::canUnspam($host->username)) {
            $request = Contact::where('user_id', $host->id)
            ->where('contact_id', $user->id)
            ->where('status', 'spam')->update(['status' => 'rejected']);
            if ($request) {
                return back()->with('message', ['unignoreRequest' => "You successfully removed ".$host->username." from spams list."]);
            }
            return back()->with('message', ['unignoreRequest' => "OOPS! Sorry, something went wrong with removing ".$host->username." from spams list. Please try again later."]);
        }
        return back()->with('message', ['unignoreRequest' => "OOPS! Sorry, something went wrong with remove this user from spams list. Please try again later."]);
    }

    public function getSpammedUsers(Request $request) {
        $user = Auth::user();
        $ignoredUsers = $user->followers()->wherePivot('status', 'spam')
        ->get()
        ->each(function($user) {
            $user->media_forms = $user->media_forms;
        });

        $paginator = new Paginator(
            array_slice($ignoredUsers->toArray(), ($request->input('page') - 1) * 50, 50),
            $ignoredUsers->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );

        return response()->json([
            "ignoredUsers" => $paginator,
        ]);

        return response()->json();
    }

    public function cancelFollowRequest($username) {
        if(!Abilities::isBlocked($username) && Abilities::canCancelRequest($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('user_id', Auth::guard()->user()->id)
            ->where('contact_id', $host->id)
            ->where('status', 'pending')->first();
            if ($host && $request) {
                $request->status = 'cancelled';
                $request->save();
                event(new CancelFollowRequestEvent( $host ));
                return back()->with('message', ['cancelRequest' => "Follow request has been cancelled."]);
            }
            return back()->with('message', ['cancelRequest' => "OOPS! Sorry, something went wrong with cancelling the request. Please try again later."]);
        }
        return back()->with('message', ['cancelRequest' => "OOPS! Sorry, something went wrong with cancelling the request. Please try again later."]);
    }

    public function unFollow($username) {
        if(!Abilities::isBlocked($username) && Abilities::canUnfollow($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('user_id', Auth::guard()->user()->id)
            ->where('contact_id', $host->id)
            ->where('status', 'accepted')->first();
            if ($host && $request) {
                $request->status = 'cancelled';
                $request->save();
                return back()->with('message', ['unfollow' => "You unfollowed ".$host->username]);
            }
            return back()->with('message', ['unfollow' => "OOPS! Sorry, something went wrong with unfollowing this user. Please try again later."]);
        }
        return back()->with('message', ['unfollow' => "OOPS! Sorry, something went wrong with unfollowing this user. Please try again later."]);
    }

    public function removeFollower($username) {
        if(!Abilities::isBlocked($username) && Abilities::canRemove($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('user_id', $host->id)
            ->where('contact_id', Auth::guard('web')->user()->id)
            ->where('status', 'accepted')->first();
            if ($host && $request) {
                $request->status = 'cancelled';
                $request->save();
                return back()->with('message', ['removedFollower' => "You removed ".$host->username." from your followers list."]);
            }
            return back()->with('message', ['removedFollower' => "OOPS! Sorry, something went wrong with removing this user from your followers list. Please try again later."]);
        }
        return back()->with('message', ['removedFollower' => "OOPS! Sorry, something went wrong with removing this user from your followers list. Please try again later."]);
    }

    public function blockUser($username) {
        if (Abilities::canBlock($username)) {
            $user = Auth::guard('web')->user();
            $host = User::where('username', $username)->first();
            if ($host) {
                $block = Block::updateOrCreate(
                    ['user_id' => $user->id, 'blocked_user_id' => $host->id], 
                    ['is_blocked' => true]
                );
                if($block) {
                    // event(new FollowRequestEvent(Auth::guard()->user(), $host));
                    $block->counter += 1;
                    $block->save();

                    $this->rejectFollowRequest($username);
                    $this->cancelFollowRequest($username);
                    $this->unFollow($username);
                    $this->removeFollower($username);

                    event(new BlockEvent($user, $host, true));

                    return back()->with('message', ['blockUser' => "You just blocked ".$host->username."."]);
                }
                return back()->with('message', ['blockUser' => "You cannot block this user at this moment."]);
            }
        }
        return back()->with('message', ['blockUser' => "You cannot block this user at this moment."]);
    }

    public function unBlockUser($username) {
        if (Abilities::canUnblock($username)) {
            $user = Auth::guard('web')->user();
            $host = User::where('username', $username)->first();
            $block = Block::where('user_id', $user->id)->where('blocked_user_id', $host->id)
            ->where('is_blocked', true)->first();
            if ($host && $block) {
                $block->is_blocked = false;
                $block->save();

                event(new FollowRequestEvent(Auth::guard()->user(), $host));
                event(new BlockEvent($user, $host, false));

                return back()->with('message', ['unBlockUser' => "You just unblocked ".$host->username."."]);
            }
            return back()->with('message', ['unBlockUser' => "You cannot unblock this user at this moment 1."]);
        }
        return back()->with('message', ['unBlockUser' => "You cannot unblock this user at this moment 2."]);
    }

    public function getBlockedUsers(Request $request) {
        $blockedUsers = Abilities::blockList()->each(function($user) {
            $user->media_forms = $user->media_forms;
        });
        $paginator = new Paginator(
            array_slice($blockedUsers->toArray(), ($request->input('page') - 1) * 50, 50),
            $blockedUsers->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );

        return response()->json([
            "blockedUsers" => $paginator,
        ]);

        return response()->json();
    }

    public function getFollowers(Request $request) {
        $followers = Abilities::followers()
        ->where('pivot.status', 'accepted')->each(function($user) {
            $user->media_forms = $user->media_forms;
        });
        $paginator = new Paginator(
            array_slice($followers->toArray(), ($request->input('page') - 1) * 50, 50),
            $followers->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );

        return response()->json([
            "followers" => $paginator,
        ]);
    }

    public function getFollowings(Request $request) {
        $followings = Abilities::followings()->where('pivot.status', 'accepted')->each(function($user) {
            $user->media_forms = $user->media_forms;
        });
        $paginator = new Paginator(
            array_slice($followings->toArray(), ($request->input('page') - 1) * 50, 50),
            $followings->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );
        return response()->json([
            "followings" => $paginator
        ]);
    }

    public function getFollowerRequests(Request $request) {
        $followerRequests = Abilities::followers()->where('pivot.status', 'pending')->each(function($user) {
            $user->media_forms = $user->media_forms;
        });
        $paginator = new Paginator(
            array_slice($followerRequests->toArray(), ($request->input('page') - 1) * 50, 50),
            $followerRequests->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );
        return response()->json([
            "incomingRequests" => $paginator,
        ]);
    }

    public function getFollowingRequests(Request $request) {
        $followingRequests = Abilities::followings()->where('pivot.status', 'pending')->each(function($user) {
            $user->media_forms = $user->media_forms;
        });
        $paginator = new Paginator(
            array_slice($followingRequests->toArray(), ($request->input('page') - 1) * 50, 50),
            $followingRequests->count(),
            15,
            $request->input('page'),
            [
                'path'  => $request->url(),
                'query' => $request->query(),
            ]
        );
        return response()->json([
            "sentRequests" => $paginator,
        ]);
    }

    public function countPendingRequests() {
        $pendings = Abilities::followers()
        ->where('pivot.status', 'pending')
        ->take(100)
        ->count();

        return response()->json([
            "counter" => $pendings,
        ]);
    }

    public function getAbilities($username) {
        return response()->json([
            "user" => $username,
            "ability" => [
                "isBlocked" => Abilities::isBlocked($username),
                "canFollow" => Abilities::canFollow($username),
                "canUnfollow" => Abilities::canUnfollow($username),
                "canBlock" => Abilities::canBlock($username),
                "canUnblock" => Abilities::canUnblock($username),
                "canReject" => Abilities::canReject($username),
                "canAccept" => Abilities::canReject($username),
                "canCancelRequest" => Abilities::canCancelRequest($username),
                "canIgnore" => Abilities::canReject($username),
                "canRemove" => Abilities::canRemove($username)
            ]
        ]);
    }
}