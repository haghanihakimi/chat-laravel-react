<?php

namespace App\Http\Controllers\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessagesController extends Controller
{
    public function index($message_id) {
        return Inertia::render('Conversations/Conversation', [
            'user' => Auth::guard('web')->user(),
        ]);
    }
}
