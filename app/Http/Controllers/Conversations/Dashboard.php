<?php

namespace App\Http\Controllers\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Dashboard extends Controller
{
    public function index() {
        return Inertia::render('Conversations/Dashboard', [
            'user' => Auth::guard('web')->user()
        ]);
    }
}
