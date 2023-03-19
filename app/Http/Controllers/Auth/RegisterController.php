<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

use App\Events\TestEvent;

class RegisterController extends Controller
{

    public function index () {
        return Inertia::render('Auth/Signup');
    }

    public function create (Request $request) {
        $request->validate([
            'first_name' => ['required', 'string', 'min:2'],
            'surname' => ['required', 'string', 'min:2'],
            'username' => ['required', 'string', 'regex:/^[a-zA-Z0-9_]+$/', 'unique:users', 'min:5'],
            'email' => ['required', 'email', 'unique:users', 'min:10'],
            'password' => ['required', 'string', 'min:6'],
            'gender' => ['required', 'string', 'max:6', 'in:female,male'],
        ],[
            'username.regex' => "The username format is invalid. Only numbers, letters A-Z and underscore allowed.",
            'username.min' => "Your username should be minimum 5 characters."
        ]);

        $user = User::create([
            'first_name' => ucfirst(trans($request->first_name)),
            'surname' => ucfirst(trans($request->surname)),
            'username' => Str::lower($request->username),
            'email' => $request->email,
            'email_verified_at' => now(),
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
        ]);

        if ($user) {
            Auth::attempt($request->only('email', 'password'), 'on');

            return redirect()->route('conversations');
        }
        
        return back()->with('message', 'Registration failed. Please check all given information and try again.');
    }
}
