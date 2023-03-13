<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
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

    public function saveNames(Request $request) {
        $user = User::find(Auth::guard('web')->user()->id);
        $inputs = $request->all();
        $dirtyInputs = [];
        $request->validate([
            'first_name' => ['required', 'string', 'min:2', 'max:24', 'regex:/^\S*$/'],
            'surname' => ['required', 'string', 'min:2', 'max:24'],
            'gender' => ['required', 'string', 'in:male,female'],
        ]);
        foreach($inputs as $inputName => $inputValue) {
            if ($user->$inputName !== $request->$inputName) {
                $dirtyInputs[] = ucfirst(Str::replace('_', ' ', $inputName));
                $user->$inputName = $inputValue;
                $user->save(); 
            }
        }
        return back()->with(['message' => 
            ['settings_names' => implode(', ', $dirtyInputs).' successfully changed.']
        ]);
    }

    public function saveEmail(Request $request) {
        $user = User::find(Auth::guard('web')->user()->id);
        $inputs = $request->all();
        $dirtyInputs = [];
        $request->validate([
            'username' => ['required', 'string', 'min:2', 'max:24', 'regex:/^[a-zA-Z0-9_]+$/', 'unique:users,username,'.$user->id.',id'],
            'email' => ['required', 'string', 'email', 'unique:users,email,'.$user->id.',id'],
            'phone' => ['nullable', 'min:10', 'max:16', 'unique:users,phone,'.$user->id.',id'],
            'privacy' => ['required', 'boolean'],
        ]);
        $privacy = $request->privacy ? 1 : 0;
        foreach($inputs as $inputName => $inputValue) {
            if ($user->$inputName !== $request->$inputName && $inputName !== 'privacy') {
                $dirtyInputs[] = ucfirst(Str::replace('_', ' ', $inputName));
                $user->$inputName = $inputValue;
                $user->save(); 
            }
        }
        if($privacy !== $user->privacy) {
            $user->privacy =  $request->privacy;
            $user->save();
            $dirtyInputs[] = 'Privacy';
        }
        return back()->with(['message' => 
            ['settings_email' => implode(', ', $dirtyInputs).' successfully changed.']
        ]);
    }

    public function savePassword(Request $request) {
        $request->validate([
            'current_password' => ['nullable', 'string', 'min:6'],
            'new_password' => ['required_with:current_password', 
            !empty($request->new_password) ? 'string' : '', 
            !empty($request->new_password) ? 'min:6' : '', 'confirmed:confirm_password'],
            'new_password_confirmation' => ['required_with:new_password', 
            !empty($request->new_password_confirmation) ? 'string' : '', 
            !empty($request->new_password_confirmation) ? 'min:6' : ''],
        ]);
        $user = User::find(Auth::guard('web')->user()->id);
        if (Hash::check($request->current_password, $user->password)) {
            $user->forceFill([
                'password' => Hash::make($request->new_password_confirmation)
            ])->setRememberToken(Str::random(60));
 
            $user->save();
 
            event(new PasswordReset($user));

            return back()->with(['message' => 
                ['settings_password' => 'Password successfully changed.']
            ]);
        }
        return back()->with(['message' => 
            ['settings_password' => 'Current password is incorrect. Please check your current password and try again.']
        ]);
    }
}
