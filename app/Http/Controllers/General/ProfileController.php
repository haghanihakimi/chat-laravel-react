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
use App\Http\Requests\ProfileRequests as Abilities;
use App\Models\User;
use App\Models\MediaForm;
use Carbon\Carbon;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function viewProfile($username) {
        if (Auth::guard('web')->user()->username !== $username) {
            $user = User::where('username', $username)->select('id', 'first_name', 'surname', 'username', 'privacy')->first();
            return Inertia::render('User/Profile', [
                'user' => $user,
                'image' => $user->media_forms()->where('media_type', 'profile')->where('is_active', true)->get(),
                'abilities' => [
                    'view' => true,
                    'follow' => true,
                    'unfollow' => true,
                    'message' => true,
                    'block' => Abilities::blockedBy($username),
                    'unblock' => true,
                ],
            ]);
        }
        return redirect()->route('settings.view');
    }

    public function settingsView(){
        $user = User::find(Auth::guard('web')->user()->id);
        return Inertia::render('User/Settings', [
            'user' => $user,
            'image' => $user->media_forms()->where('media_type', 'profile')->where('is_active', true)->get(),
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

    public function uploadProfileImage(Request $request) {
        try {
            $request->validate([
                'imageFile' => ['required', 'mimes:jpg,png,jpeg,webp', 'max: 2000']
            ]);
            $user = User::find(Auth::guard('web')->user()->id);
            $image = '';
            $uploading = $request->file('imageFile')->storeAs(
                'public/users/profile-images/'.$user->id, $image = $request->file('imageFile')->hashName()
            );
            $user->media_forms()->where('media_type', 'profile')->where('is_active', true)->update(['is_active' => false]);
            MediaForm::create([
                'user_id' => $user->id,
                'message_id' => NULL,
                'media_type' => 'profile',
                'media_path' => '/storage/users/profile-images/'.$user->id.'/'.$image,
                'is_active' => true,
            ]);
            return back()->with(['message' => ['image_upload_success' => 'Your profile image successfully updated.']]);
        } catch(\Exception $e) {
            return back()->with(['message' => ['image_upload_failure' => 'OOPS! Sorry, something went wrong with updating your profile image.']]);
        }
    }

    public function searchUsers(Request $request) {
        $search = User::search($request->input('keywords'))->where('id', '!=', Auth::guard('web')->user()->id)
        ->select('id', 'first_name', 'surname', 'username')
        ->with(['media_forms' => function($query) {
            $query->where('media_type', 'profile')->where('is_active', true)
            ->select('user_id', 'media_path');
        }])->get();
        
        return response()->json($search);
    }
}
