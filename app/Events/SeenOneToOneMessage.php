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

class SeenOneToOneMessage implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $seen;
    public $seen_at;
    public $user;
    public $chat;
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($receiver, $seen, $seen_at, $user, $chat, $message)
    {
        $this->receiver = $receiver;
        $this->seen = $seen;
        $this->seen_at = $seen_at;
        $this->user = $user;
        $this->chat = $chat;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('seenOneToOneMessage.'.$this->receiver->id);
    }

    public function broadcastWith () {
        return [
            'seen' => $this->seen,
            'seen_at' => $this->seen_at,
            'user' => $this->user,
            'host' => $this->receiver->id,
            'chat' => $this->chat,
            'message' => $this->message,
        ];
    }
}
