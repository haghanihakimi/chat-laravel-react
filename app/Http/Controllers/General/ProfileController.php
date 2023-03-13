<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function viewProfile($username) {
        return Inertia::render('User/Profile', [
            'user' => 'Sarah'
        ]);
    }

    public function settingsView(){
        $user = User::find(Auth::guard('web')->user()->id);
        return Inertia::render('User/Settings', [
            'user' => $user,
            'image' => $user->media_forms()->where('media_type', 'profile')->get(),
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
            'email_verified_at' => $request->email !== $user->email ? now() : $user->email_verified_at,
            'password' => !empty($request->new_password_confirmation) ? Hash::make($request->new_password_confirmation) : $user->password,
            'phone' => !empty($request->phone) ? $request->phone : $user->phone,
            'gender' => $request->gender !== $user->gender ? $request->gender : $user->gender,
            'privacy' => $request->privacy !== $user->privacy ? $request->privacy : $user->privacy,
        ]);
        return back()->with(['message' => 
            ['settings_success' => 'Changes successfully saved.']
        ]);
    }

    private function validateSettings($request, $user) {
        return $request->validate([
            'first_name' => ['required', 'string', 'min:2', 'max:24', 'regex:/^\S*$/'],
            'surname' => ['required', 'string', 'min:2', 'max:24'],
            'username' => ['required', 'string', 'min:2', 'max:24', 'regex:/^[a-zA-Z0-9_]+$/', 'unique:users,username,'.$user->id.',id'],
            'email' => ['required', 'string', 'email', 'unique:users,email,'.$user->id.',id'],
            'phone' => ['nullable', 'min:10', 'max:16', 'unique:users,phone,'.$user->id.',id'],
            'gender' => ['required', 'string', 'in:male,female'],
            'privacy' => ['required', 'boolean'],
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
