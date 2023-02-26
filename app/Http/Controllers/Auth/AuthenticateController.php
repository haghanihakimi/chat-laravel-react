<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Inertia\Inertia;

class AuthenticateController extends Controller
{
    public function index () {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function signin (LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (Auth::guard('web')->check() && !empty(Auth::guard('web')->user()->default_password)) {
            return redirect()->route('view.change.password');
        }
        return redirect()->route('dashboard');
    }

    public function signout (Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('root');
    }

    /**
     * Display a page to let user to change their default password
     * @return Inertia
     */
    public function viewDefaultPassword () {
        $user = User::find(Auth::guard()->user()->id);
        if (empty($user->default_password)) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Auth/ViewChangeDefaultPassword');
    }

    /**
     * Change user's default password to whaever they choose
     * @return response
     */
    public function changeDefaultPassword (Request $request) {
        $request->validate([
            'password' => ['required', 'string', 'min:8']
        ]);
        $user = User::find(Auth::guard('web')->user()->id);
        if (!empty($user->default_password)) {
            $user->password = Hash::make($request->password);
            $user->default_password = NULL;
            if($user->save()) {
                return redirect('dashboard')->with('message', 'Your password changed successfully.');
            }
            return back()->with('message', 'Password updated failed. Please try again later.');
        }
        return back()->with('message', 'You already changed your password. You cannot change your password twice using this page. <br/>Please contact administrator to reset your password.');
    }
}
