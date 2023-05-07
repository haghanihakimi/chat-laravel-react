<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

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
    ];
    
    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    public function pin($user, $istwoway)
    {
        $this->pinned = $istwoway ? true : false;
        $this->pinned_by = $user;
        if($this->save()) {
            return true;
        }
        return false;
    }

    public function unpin($user)
    {
        if($this->pinned_by === $user){ 
            $this->pinned = false;
            $this->pinned_by = null;
            if($this->save()) {
                return true;
            }
            return false;
        }
        return false;
    }
}
