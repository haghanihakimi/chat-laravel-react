<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    public function recoverAccountView() {
        return Inertia::render('Auth/AccountRecovery'); 
    }

    public function passwordResetRequest(Request $request) {
        if (Auth::guard('web')->check()) { 
            $status = Password::sendResetLink(
                Auth::guard('web')->user()->only('email')
            );
            
            if ($status === Password::RESET_LINK_SENT) {
                Session::put('passwordReset', now()->addMinutes(60));
                return back()->with('message', ['code' => 'success', 'status' => __($status)]);
            }
            return back()->withErrors('message', ['code' => 'failure', 'status' => __($status)]);
        } else {
            $request->validate(['email' => ['required', 'email']]);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status === Password::RESET_LINK_SENT) {
                Session::put('passwordReset', now()->addMinutes(60));
                return back()->with('message', ['code' => 'success', 'status' => __($status)]);
            }
            return back()->withErrors('message', ['code' => 'failure', 'status' => __($status)]);
        }
    }

    public function resetPasswordView($token, Request $request) {
        if (Session::exists('passwordReset') && Session::get('passwordReset') > now()->addMinutes(10)) {
            return Inertia::render('Auth/ResetPassword', [
                'token' => $token,
            ]);
        } else {
            return redirect()->route('login');
        }
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => ['required', 'email'],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
        if ($status === Password::PASSWORD_RESET) {
            Session::forget('passwordReset');
            return redirect()->route('login')->with('message', ['code' => 'success', 'status' => __($status)]);
        }
     
        return back()->withErrors('message', ['code' => 'failure', 'status' => [__($status)]]);
    }

    public function receiveResetPassword(Request $request) {
        $request->validate([
            'email' => ['required', 'email']
        ]);
        if (User::where('email', $request->email)->exists()) {
            return $this->passwordResetRequest($request);
        }
        return back()->with('message', ['code' => 'failure', 'status' => "No account found! Pleae try again with other information."]);
    }
}
