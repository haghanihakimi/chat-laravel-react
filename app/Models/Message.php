<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = "Messages";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chat_id',
        'messages',
        'seen_at',
        'pinned',
        'pinned_by',
        'pinned_at',
    ];
    
    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    public function pin($user, $istwoway)
    {
        $this->pinned = $istwoway ? true : false;
        $this->pinned_by = $user;
        $this->pinned_at = now();
        if($this->save()) {
            return true;
        }
        return false;
    }

    public function unpin($user)
    {
        if($this->pinned_by == $user){ 
            $this->pinned = false;
            $this->pinned_by = null;
            $this->pinned_at = null;
            if($this->save()) {
                return true;
            }
            return false;
        } else {
            $this->pinned = false;
            $this->pinned_at = null;
            if($this->save()) {
                return true;
            }
            return false;
        }
        return false;
    }

    public function reactions() {
        return $this->hasMany(MessageReaction::class, 'message_id');
    }
}
