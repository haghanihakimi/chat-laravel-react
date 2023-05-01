<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sender_id',
        'recipient_id',
        'deleter_id',
    ];

    protected $dates = ['deleted_at'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id');
    }

    public function media_forms() {
        return $this->hasMany(MediaForm::class, 'message_id');
    }

    public function scopeMessage($query, $chat, $message, $host, $user) {
        return $query->where('sender_id', $user->id)
        ->orWhere('recipient_id', $host->id)
        ->where('id', $chat)
        ->orWhere('sender_id', $host->id)
        ->where('recipient_id', $user->id)
        ->where('id', $chat)->first()
        ->messages
        ->where('id', $message)
        ->where('pinned', false);
    }
}
