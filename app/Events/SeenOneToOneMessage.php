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

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($receiver, $seen)
    {
        $this->receiver = $receiver;
        $this->seen = $seen;
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
        ];
    }
}
