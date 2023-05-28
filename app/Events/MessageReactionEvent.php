<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageReactionEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $chat;
    public $message;
    public $host;
    public $user;
    public $reactionValue;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($receiver, $chat, $message, $host, $user, $reactionValue)
    {
        $this->receiver = $receiver;
        $this->chat = $chat;
        $this->message = $message;
        $this->host = $host;
        $this->user = $user;
        $this->reactionValue = $reactionValue;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('message.reaction.'.$this->receiver->id);
    }

    public function broadcastWith () {
        return [
            "chat" => $this->chat,
            "message" => $this->message,
            "host" => $this->host,
            "user" => $this->user,
            "reaction" => $this->reactionValue
        ];
    }
}
