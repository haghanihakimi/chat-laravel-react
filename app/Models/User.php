<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
        return $this->belongsToMany(Block::class, 'blocked_user_id', 'id');
    }

    public function blockedBy()
    {
        return $this->belongsToMany(Block::class, 'block_user', 'user_id', 'block_id');
    }

    public function scopeSearch ($query, $input) {
        return $query->where('first_name', 'LIKE', '%' .$input. '%')
        ->orWhere('surname', 'LIKE', '%' .$input. '%')
        ->orWhere('username', 'LIKE', '%' .$input. '%');
    }
}
