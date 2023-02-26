<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Auth\EmailVerification;
use App\Models\User;
use Inertia\Inertia;

class RegisterController extends Controller
{

    public function index () {
        return Inertia::render('Auth/Signup');
    }

    public function create (Request $request) {
        $request->validate([
            'first_name' => ['required', 'string', 'min:2'],
            'surname' => ['required', 'string', 'min:2'],
            'email' => ['required', 'email', 'unique:users', 'min:10'],
            'password' => ['required', 'string', 'min:6']
        ]);
        $user = User::create([
            'fname' => ucfirst(trans($request->first_name)),
            'sname' => ucfirst(trans($request->surname)),
            'email' => $request->email,
            'email_verified_at' => null,
            'password' => Hash::make($request->password),
            'default_password' => NULL,
        ]);
        if ($user) {
            EmailVerification::sendLink(EmailVerification::url('verification.verify', $user), $user);
            Auth::attempt($this->only('email', 'password'), 'on');
            $loginRequest->session()->regenerate();

            return redirect()->route('verification.notice');
        }
        return back()->with('message', 'Registration failed. Please check all given information and try again.');
    }
}
