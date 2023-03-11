<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function viewProfile($username) {
        return Inertia::render('User/Profile', [
            'user' => 'Sarah'
        ]);
    }

    public function settingsView(){
        return Inertia::render('User/Settings', [
            'user' => Auth::guard('web')->user(),
        ]);
    }

    public function save(Request $request) {
        $user = User::find(Auth::guard('web')->user()->id);
        $this->validateSettings($request, $user);
        $user->update([
            'firstname' => !empty($request->first_name) ? $request->first_name : $user->firstname,
            'surname' => !empty($request->surname) ? $request->surname : $user->surname,
            'username' => !empty($request->username) ? $request->username : $user->username,
            'email' => !empty($request->email) ? $request->email : $user->email,
            'email_verified_at' => $request->email !== $user->email ? NULL : $user->email_verified_at,
            'password' => !empty($request->new_password_confirmation) ? Hash::make($request->new_password_confirmation) : $user->password,
        ]);
        return redirect()->back()->with(['message' => ['settings_success' => 'Changes successfully saved.']]);
    }

    private function validateSettings($request, $user) {
        return $request->validate([
            'first_name' => ['required', 'string', 'min:2', 'max:24', 'regex:/^\S*$/'],
            'surname' => ['required', 'string', 'min:2', 'max:24'],
            'username' => ['required', 'string', 'min:2', 'max:24', 'regex:/^[a-zA-Z0-9_]+$/', 'unique:users,username,'.$user->id.',id'],
            'email' => ['required', 'string', 'email', 'unique:users,email,'.$user->id.',id'],
            'current_password' => ['nullable', 'string', 'min:6'],
            'new_password' => ['required_with:current_password', 
            !empty($request->new_password) ? 'string' : '', 
            !empty($request->new_password) ? 'min:6' : '', 'confirmed:confirm_password'],
            'new_password_confirmation' => ['required_with:new_password', 
            !empty($request->new_password_confirmation) ? 'string' : '', 
            !empty($request->new_password_confirmation) ? 'min:6' : ''],
        ]);
    }
}
