<?php

namespace App\Http\Controllers\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProfileRequests as Abilities;
use App\Http\Resources\HostResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\MediaFormsResource;
use App\Models\User;
use App\Models\Chat;
use Inertia\Inertia;

class MessagesController extends Controller
{
    public function index($username) {
        if($username !== Auth::guard('web')->user()->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $host = new HostResource(User::where('username', $username)->first());

            return Inertia::render('Conversations/Conversation', [
                'host' => $host,
                'media_forms' => [
                    "host" => new MediaFormsResource($host->media_forms->where('media_type', 'profile')->where('is_active', true)->first()),
                    "user" => new MediaFormsResource(Auth::guard('web')->user()->media_forms->where('media_type', 'profile')->where('is_active', true)->first())
                ],
            ]);
        }
        return Inertia::render('Unavailable');
    }

    public function getConversations($username) {
        // 
    }

    private function getSentMessages($username) {
        $user = Auth::guard()->user();
        if($host = User::where('username', $username)->first()){
            return $host->chats()->with('messages')->with('media_forms')->where('sender_id', $user->id)->where('recipient_id', $host->id)->get(); 
        }
        return [];

    }

    private function getReceivedMessages($username) {
        $user = Auth::guard()->user();
        if($host = User::where('username', $username)->first()){
            return $host->chats()->with('messages')->with('media_forms')->where('sender_id', $host->id)->where('recipient_id', $user->id)->get(); 
        }
        return [];
    }

    public function getMessages(Request $request, $username) {
        if($username !== Auth::guard('web')->user()->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $messages = $this->getSentMessages($username)->each(function($chat) {
                $chat->status = $chat->sender_id === Auth::guard('web')->user()->id ? "sent" : 'received';
            })->merge($this->getReceivedMessages($username))->each(function($chat) {
                $chat->status = $chat->sender_id === Auth::guard('web')->user()->id ? "sent" : 'received';
            });
            $messages = $messages->sortBy(function ($chat) {
                return $chat->messages->first()->created_at;
            });
            
            return response()->json($messages);
        }
        return response()->json(["messages" => "Unauthorized access."]);
    }
}
