<?php

namespace App\Http\Controllers\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\ProfileRequests as Abilities;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use App\Http\Resources\HostResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\MediaFormsResource;
use App\Events\DeleteMessageTwoWay;
use App\Events\SendOneToOneMessage;
use App\Events\SeenOneToOneMessage;
use App\Events\MessageReactionEvent;
use App\Events\PinMessageEvent;
use App\Models\User;
use App\Models\Chat;
use App\Models\Message;
use App\Models\MessageReaction;
use App\Models\Conversation;
use Inertia\Inertia;

class MessagesController extends Controller
{

    public function index($username) {
        if($username !== Auth::guard('web')->user()->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $host = new HostResource(User::where('username', $username)->first());
            $this->seenOneToOneMessage($username);

            // Conversations/Conversation
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
    public function getConversations(Request $request) {
        $user = Auth::user();

        $conversations = Conversation::where(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                ->where('deleted_by', '!=', $user->id)
                ->orWhereNull('deleted_by');
        })
        ->orWhere(function ($query) use ($user) {
            $query->where('recipient_id', $user->id)
                ->where('deleted_by', '!=', $user->id)
                ->orWhereNull('deleted_by');
        })
        ->with(['senderUser' => function ($query) {
            $query->with('media_forms');
        }, 'recipientUser' => function ($query) {
            $query->with('media_forms');
        }, 'chats' => function ($query) {
            $query->with('messages');
        }])
        ->orderBy('updated_at', 'desc')
        ->paginate(25);

        return response()->json([
            "conversations" => $conversations
        ]);
    }

    /**
     * Count unread conversations
     * @return JsonResponse
     */
    public function countUnreadConversations() {
        $user = Auth::user();

        $counter = Conversation::where(function ($query) use ($user) {
            $query->where('recipient_id', $user->id)
                ->whereNull('seen_at');
        })
        ->take(100)
        ->count();

        return response()->json([
            "counter" => $counter
        ]);
    }

    /**
     * Gets every single messages between two users - One to One messaging
     * "username" is required - it is the username of the user who the current user is viewing them on the messages page.
     * @return JsonResponse
     */
    public function getMessages(Request $request, $username) {
        $host = User::where('username', $username)->first();
        $user = Auth::user();

        if($username !== $user->username && !Abilities::isBlocked($username) && Abilities::canBlock($username)) {
            $messages = $user->chats($host->id)
            ->get()
            ->each(function($chat) {
                $chat->status = $chat->sender_id === Auth::user()->id ? "sent" : "received";
            });

            $messages = new Paginator(
                array_slice($messages->toArray(), ($request->input('page') - 1) * 50, 50),
                $messages->count(),
                50,
                $request->input('page'),
                [
                    'path'  => $request->url(),
                    'query' => $request->query(),
                ]
            );
            
            return response()->json([
                "messages" => $messages,
                "currentUser" => $user->id,
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
            $chatkey = Str::uuid()->toString();
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
                    $message = $chat->with(['messages' => function ($query) {
                        $query->orderBy('created_at', 'desc')
                        ->with('reactions');
                    }])
                    ->with('media_forms')
                    ->latest()
                    ->first();

                    $conversation = Conversation::where('sender_id', $user->id)
                    ->where('recipient_id', $host->id)
                    ->orWhere('sender_id', $host->id)
                    ->where('recipient_id', $user->id)
                    ->first();

                    if($conversation) {
                        $conversation->chat_id = $chat->id;
                        $conversation->sender_id = $user->id;
                        $conversation->recipient_id = $host->id;
                        $conversation->seen_at = null;
                        $conversation->deleted_by = null;

                        $conversation->save();
                        $chat->conversation_id = $conversation->id;
                        $chat->save();
                    } else {
                        $conversation = Conversation::create([
                            'chat_id' => $chat->id,
                            'sender_id' => $user->id,
                            'recipient_id' => $host->id,
                            'seen_at' => null,
                        ]);
                        $chat->conversation_id = $conversation->id;
                        $chat->save();
                    }

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
        $messageId = null;
        $chatId = null;
        $seen_at = null;

        $seenMessages = Chat::where('recipient_id', $user->id)
        ->where('sender_id', $host->id)
        ->has('messages')
        ->with(['messages' => function($query) {
            $query->whereNull('seen_at');
        }])
        ->each(function($chat) use(&$messageId, &$chatId, &$seen_at) {
            $chat->messages->each(function($message) use($chat, &$chatId, &$messageId, &$seen_at) {
                $chatId = $chat->id;
                $messageId = $message->id;
                $seen_at = now();
                $message->seen_at = now();
                $message->save();
            });
        });
        

        if (!empty($seenMessages)) {
            $conversation = Conversation::where('sender_id', $host->id)
            ->where('recipient_id', $user->id)->update(['seen_at' => now()]);
            event(new SeenOneToOneMessage($host, $seenMessages, $seen_at, $user->id, $chatId, $messageId));
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
        $host = User::find($host);
        $user = Auth::user();

        if($host->username !== $user->username && !Abilities::isBlocked($host->username) && Abilities::canBlock($host->username)) {
            $delete = Chat::where('id', $chat)
            ->where('sender_id', $user->id)
            ->where('recipient_id', $host->id)
            ->update(['deleter_id' => $user->id]);

            return response()->json([
                "messages" => "Selected message removed."
            ]);
        }
        
        return response()->json(["messages" => "Unauthorized access."]);
    }

    /**
     * Removes received message.
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function removeReceivedMessage($chat,$host) {
        $host = User::find($host);
        $user = Auth::user();

        if($host->username !== $user->username && !Abilities::isBlocked($host->username) && Abilities::canBlock($host->username)) {
            $delete = Chat::where('id', $chat)
            ->where('recipient_id', $user->id)
            ->where('sender_id', $host->id)
            ->update(['deleter_id' => $user->id]);

            return response()->json([
                "messages" => "Message removed."
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
     * One way remove conversation
     * "chat" required - it is ID of the selected message/chat
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function removeConversation($host, $conversation) {
        $user = Auth::user();
        $host = User::find($host);
        $conversation = Conversation::where('id', $conversation)
        ->where('sender_id', $user->id)
        ->where('recipient_id', $host->id)
        ->orWhere('id', $conversation)
        ->where('sender_id', $host->id)
        ->where('recipient_id', $user->id)->first();
        
        if($conversation) {
            $delete = Chat::where('conversation_id', $conversation->id)
            ->where('sender_id', $user->id)
            ->where('recipient_id', $host->id)
            ->orWhere('conversation_id', $conversation->id)
            ->where('sender_id', $host->id)
            ->where('recipient_id', $user->id)
            ->chunk(50, function ($records) use($user) {
                foreach ($records as $record) {
                    $record->deleted_at = (!is_null($record->deleter_id) && $record->deleter_id !== $user->id) ? now() : null;
                    if(is_null($record->deleter_id)) {
                        $record->deleter_id =  $user->id;
                    }
                    $record->save();
                }
            });
            if(is_null($conversation->deleted_by)) {
                $conversation->deleted_by = $user->id;
                $conversation->save();
            }else {
                $conversation->delete();
            }

            return back()->with('message', ['removeConversation' => "Conversation removed."]);
        }
    }

    /**
     * pin selected message
     * "Request" required - Specifies if selected message shold be pinned only for the current user or for both users.
     * "chat" required - it is ID of the selected message/chat
     * "message" required - It is ID of the message that should be pinned.
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
        
        // return response()->json($chats);

        if(!is_null($chats) && Chat::pinnedMessages($host, $user)->count() < 100) {
            if($chats->pin($user->id, $request->istwoway)) {
                if($request->istwoway) {
                    $action = "pin";
                    event(new PinMessageEvent($host, $message, $action));
                }
                return response()->json(["messages" => "Message pinned"]);
            }
            return response()->json(["messages" => "Unable to pin this message. Please try again later."]);
        }
    }

    /**
     * Unpin selected message
     * "chat" required - it is ID of the selected chat
     * "message" required - It is ID of the message should be unpinned.
     * "host" required - It is ID of the user who is receives messages from user who is deleting the message.
     * @return Void|JsonResponse
     */
    public function unPinOneToOneMessage($chat, $message, $host) {
        // return response()->json(["Chat" => $chat, "message" => $message, "host" => $host]);
        $host = User::find($host);
        $user = Auth::user();

        // return response()->json(["Chat" => $chat, "message" => $message, "host" => $host->id, "user" => $user->id]);
        

        $chats = Chat::pinnedMessages($host, $user)->where('id', $message)->first();

        if(!is_null($chats)) {
            if($chats->unpin($user->id)) {
                $action = "unpin";
                event(new PinMessageEvent($host, $message, $action));
                return response()->json(["messages" => "Message unpinned"]);
            }
            return response()->json(["messages" => "Unable to unpin this message. Please try again later."]);
        }
    }

    /**
     * Get and count number of pinned messages
     * "username" required - It is username of the user who is chatting with other user.
     * @return Void|JsonResponse
     */
    public function countPinnedOneToOneMessages($username) {
        $host = User::where('username', $username)->first();
        $user = Auth::user();

        $chats = Chat::pinnedMessages($host, $user)->count();

        return response()->json(["pins" => $chats]);
    }

    /**
     * React to the selected message - only [Like, Dislike, Love] are allowed
     * "chat" required - It is ID of the current chat.
     * "message" required - It is ID of the selected message which is going to me marked as "Liked".
     * "host" required - It is ID of the user who the current user is chatting with.
     * "reaction" required - It is type of reaction which is sent from front-end.
     * @return Void|JsonResponse
     */
    public function messageReaction($chat, $message, $host, $reaction) {
        $host = User::find($host);
        $user = Auth::user();

        if(!Abilities::isBlocked($host->username) && Abilities::canBlock($host->username)) {
            $currentReaction = MessageReaction::where('user_id', $user->id)
            ->where('message_id', $message)
            ->first();
            $reactionValue = null;

            if ($currentReaction) {
                if ($currentReaction->reaction === $reaction) {
                    $currentReaction->delete();
                } else {
                    $currentReaction->reaction = $reaction;
                    $currentReaction->save();
                    $reactionValue = $reaction;
                }
            } else {
                $reaction = MessageReaction::create([
                    'user_id' => $user->id,
                    'message_id' => $message,
                    'reaction' => $reaction,
                ]);
                $reactionValue = $reaction;
            }

            event(new MessageReactionEvent($host, $chat, $message, $host->id, $user->id, $reactionValue));

            return response()->json([
                "chat" => $chat,
                "message" => $message,
                "host" => $host->id,
                "user" => $user->id,
                "reaction" => $reactionValue
            ]);
        }
    }
}
