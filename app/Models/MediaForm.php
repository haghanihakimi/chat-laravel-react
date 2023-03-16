<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaForm extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'message_id',
        'media_type',
        'media_path',
        'is_active',
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function messages() {
        return $this->belongsToMany(Message::class);
    }
}
