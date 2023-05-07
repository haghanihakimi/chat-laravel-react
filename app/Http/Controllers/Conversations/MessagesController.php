<?php

namespace App\Http\Controllers\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProfileRequests as Abilities;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Http\Resources\HostResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\MediaFormsResource;
use App\Events\DeleteMessageTwoWay;
use App\Events\SendOneToOneMessage;
use App\Events\SeenOneToOneMessage;
use App\Models\User;
use App\Models\Chat;
use App\Models\Message;
use Inertia\Inertia;

class MessagesController extends Controller
{

    public function index($username) {
        if($username !== Auth::guard('web')->user()->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $host = new HostResource(User::where('username', $username)->first());
            $this->seenOneToOneMessage($username);

            return Inertia::render('Conversations/Conversation', [
                'host' => $host,
                'abilities' => [
                    'canFollow' => Abilities::canFollow($username),
                    'canRemove' => Abilities::canRemove($username),
                ],
                'media_forms' => [
                    "host" => new MediaFormsResource($host->media_forms->where('media_type', 'profile')->where('is_active', true)->first()),
                    "user" => new MediaFormsResource(Auth::guard('web')->user()->media_forms->where('media_type', 'profile')->where('is_active', true)->first())
                ],
            ]);
        }
        return Inertia::render('Unavailable');
    }

    /**
     * Gets list of chats between users - One to One
     * @return JsonResponse
     */
    public function getConversations($username) {
        // 
    }

    /**
     * Gets every single messages between two users - One to One messaging
     * "username" is required - it is the username of the user who the current user is viewing them on the messages page.
     * @return JsonResponse
     */
    public function getMessages($username) {
        $host = User::where('username', $username)->first();
        $user = Auth::user();

        if($username !== $user->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $messages = $host->chats()
            ->with(['messages' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->with('media_forms')
            ->where('recipient_id', $user->id)
            ->get()
            ->each(function($chat) {
                $chat->status = $chat->sender_id === Auth::user()->id ? "sent" : "received";
            });
            
            return response()->json([
                "messages" => $messages,
            ]);
        }
        
        return response()->json(["messages" => "Unauthorized access."]);
    }

    /**
     * Send message to receiver.
     * "username" required - "username" of receiver's account.
     * @return Void|JsonResponse
     */
    public function sendMessageOneToOne($username, Request $request) {
        $user = Auth::user();
        $host = User::where('username', $username)->first();

        if($username !== $user->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $chat = Chat::create([
                'sender_id' => $user->id,
                'recipient_id' => $host->id,
            ]);

            if ($chat) {
                $message = Message::create([
                    'chat_id' => $chat->id,
                    'messages' => $request->message,
                ]);
                if($message) {
                    $message = $chat->with('messages')
                    ->with('media_forms')
                    ->latest()
                    ->first();

                    event(new SendOneToOneMessage($host, $message->setAttribute('status', "received")));

                    return response()->json([
                        "messages" => $message->setAttribute('status', "sent"),
                    ]);
                }
            }

            return response()->json([
                "messages" => "Failed to send message. Please try again later."
            ]);
        }
        
        return response()->json(["messages" => "Unauthorized access."]);
    }

    /**
     * Seen all received/unseen messages
     * "username" required - "username" of receiver's account.
     * @return Void|JsonResponse
     */
    public function seenOneToOneMessage($username) {
        $user = Auth::user();
        $host = User::where('username', $username)->first();

        $seenMessages = Chat::where('recipient_id', $user->id)
        ->where('sender_id', $host->id)
        ->has('messages')
        ->with(['messages' => function($query) {
            $query->whereNull('seen_at');
        }])
        ->each(function($chat) {
            $chat->messages->each(function($message) {
                $message->seen_at = now();
                $message->save();
            });
        });
        

        if ($seenMessages) {
            event(new SeenOneToOneMessage($host, $seenMessages));
            return response()->json([
                "messages" => $seenMessages
            ]);
        }
    }

    /**
     * Removes the single message which is chosen by the current user only for the user who's removing it.
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function removeSingleMessageOneWay($chat,$host) {
        $user = Auth::user();

        if($username !== $user->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $delete = Chat::where('id', $chat)
            ->where('sender_id', $user->id)
            ->where('recipient_id', $host)
            ->update(['deleter_id' => $user->id]);

            return response()->json([
                "messages" => "Selected message removed."
            ]);
        }
        
        return response()->json(["messages" => "Unauthorized access."]);
    }

    /**
     * Removes the single message which is chosen by the current user for both sender and receiver users.
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function removeSingleMessageTwoWay($chat,$host) {
        $user = Auth::user();
        $host = User::find($host);

        if(!Abilities::isBlocked($host->username) && Abilities::canBlock($host->username)) {
            $delete = Chat::where('id', $chat)
            ->where('sender_id', $user->id)
            ->where('recipient_id', $host->id)
            ->update(['deleter_id' => $user->id, "deleted_at" => now()]);
    
            event(new DeleteMessageTwoWay($host, $chat));

            return response()->json([
                "messages" => "Selected message permanently deleted from two sides."
            ]);
        }
        
        return response()->json(["messages" => "Unauthorized access."]);
    }

    /**
     * pin selected message
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function pinOneToOneMessage(Request $request, $chat, $message, $host) {
        $request->validate([
            'istwoway' => ['required', 'boolean']
        ]);
        // return response()->json(["Chat" => $chat, "message" => $message, "host" => $host]);
        $host = User::find($host);
        $user = Auth::user();

        // return response()->json(["Chat" => $chat, "message" => $message, "host" => $host->id, "user" => $user->id]);
        

        $chats = Chat::message($chat, $message, $host, $user)->first();

        if(!is_null($chats) && Chat::pinnedMessages($host, $user)->count() < 100) {
            if($chats->pin($user->id, $request->istwoway)) {
                return response()->json(["messages" => "Message pinned"]);
            }
            return response()->json(["messages" => "Unable to pin this message. Please try again later."]);
        }
    }

    /**
     * pin selected message
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function countPinnedOneToOneMessages($username) {
        $host = User::where('username', $username)->first();
        $user = Auth::user();

        $chats = Chat::pinnedMessages($host, $user)->count();

        return response()->json(["pins" => $chats]);
    }
}
