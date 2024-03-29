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

class PinMessageEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $message;
    public $action;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($receiver, $message, $action)
    {
        $this->receiver = $receiver;
        $this->message = $message;
        $this->action = $action;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('pin.message.'.$this->receiver->id);
    }

    public function broadcastWith () {
        return [
            "message" => $this->message,
            "action" => $this->action,
        ];
    }
}
