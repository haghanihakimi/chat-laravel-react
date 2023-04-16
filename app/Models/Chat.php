<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sender_id',
        'recipient_id',
    ];

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
}
