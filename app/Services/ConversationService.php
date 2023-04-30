<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\User;

class UserService {
 
    public function store(array $user, array $host): User
    {
        $host = User::where('username', $username)->first();
        $user = Auth::user();

        $messages = $host->chats()
        ->with('messages')
        ->with('media_forms')
        ->where('recipient_id', $user->id)
        ->get()
        ->each(function($chat) {
            $chat->status = $chat->sender_id === Auth::user()->id ? "sent" : "received";
        });
            
        return $messages;
    }
 
    public function update(array $userData, User $user): User
    {
        $user->update($userData);
        $user->roles()->sync($userData['roles']);
 
        // Also, more actions with that user
    }
}