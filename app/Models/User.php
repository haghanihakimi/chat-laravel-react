<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'surname',
        'username',
        'email',
        'email_verified_at',
        'phone',
        'password',
        'gender',
        'privacy',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function media_forms() {
        return $this->hasMany(MediaForm::class, 'user_id');
    }

    public function blocks()
    {
        return $this->belongsToMany(User::class, Block::class, 'blocked_user_id', 'user_id')->withPivot(['is_blocked', 'created_at', 'updated_at']);
    }

    public function blockedBy()
    {
        return $this->belongsToMany(User::class, Block::class, 'user_id', 'blocked_user_id')->withPivot(['is_blocked', 'created_at', 'updated_at']);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, Contact::class, 'contact_id', 'user_id')->withPivot(['status', 'created_at', 'updated_at']);
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, Contact::class, 'user_id', 'contact_id')->withPivot(['status', 'created_at', 'updated_at']);
    }

    public function chats($userId) {
        return $this->hasMany(Chat::class, 'sender_id')
        ->where(function($query) use ($userId) {
            $query->where('sender_id', $this->id)
            ->where('recipient_id', $userId)
            ->whereNull('deleter_id');
        })
        ->orWhere(function($query) use ($userId) {
            $query->where('sender_id', $userId)
            ->where('recipient_id', $this->id)
            ->whereNull('deleter_id')
            ->orWhere('deleter_id', '!=', $this->id);
        })
        ->with(['messages' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->with('media_forms')
        ->orderBy('created_at', 'asc');
    }

    public function scopeSearch ($query, $input) {
        return $query->where('first_name', 'LIKE', '%' .$input. '%')
        ->orWhere('surname', 'LIKE', '%' .$input. '%')
        ->orWhere('username', 'LIKE', '%' .$input. '%');
    }
}
