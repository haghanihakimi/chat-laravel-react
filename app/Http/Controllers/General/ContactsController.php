<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\ProfileRequests as Abilities;
use App\Models\User;
use App\Models\Contact;
use App\Events\SendFollowRequest as FollowRequestEvent;

class ContactsController extends Controller
{
    public function sendFollowRequest($username) {
        if(!Abilities::blockedBy($username) && Abilities::canFollow($username)) {
            $host = User::where('username', $username)->first();
            if ($host) {
                $contact = Contact::updateOrCreate(
                ['user_id' => Auth::guard('web')->user()->id, 'contact_id' => $host->id],
                ['status' => 'pending']);
                if($contact) {
                    // event(new FollowRequestEvent(Auth::guard()->user(), $host));
                    return back()->with('message', ['followRequest' => "Follow request has been sent."]);
                }
                return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
            }
            return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
        }
        return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
    }

    public function cancelFollowRequest($username) {
        if(!Abilities::blockedBy($username) && Abilities::canCancelRequest($username)) {
            $host = User::where('username', $username)->first();
            $request = Contact::where('user_id', Auth::guard()->user()->id)
            ->where('contact_id', $host->id)
            ->where('status', 'pending')->first();
            if ($host && $request) {
                $request->status = 'cancelled';
                $request->save();
                return back()->with('message', ['followRequest' => "Follow request has been cancelled."]);
            }
            return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
        }
        return back()->with('message', ['followRequest' => "Sending follow request to this user is temporarily unavailable. Please try again later."]);
    }
}