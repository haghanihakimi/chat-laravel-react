<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function viewProfile($username) {
        return Inertia::render('User/Profile', [
            'user' => 'Sarah'
        ]);
    }
}
