<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $table = "Conversations";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chat_id',
        'sender_id',
        'recipient_id',
        'seen_at',
    ];

    // protected $dates = ['deleted_at'];

    public function senderUser(){ 
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipientUser(){ 
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function chats(){ 
        return $this->hasMany(Chat::class, 'id', 'chat_id');
    }
}
