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

class SendFollowRequest implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $requestSender;
    protected $requestReceiver;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($requestSender, $requestReceiver)
    {
        $this->requestSender = $requestSender;
        $this->requestReceiver = $requestReceiver;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.'.$this->requestReceiver->id);
    }

    public function broadcastWith () {
        return [
            'followRequests' => $this->requestSender->username.' has sent you a follow request.',
        ];
    }
}
