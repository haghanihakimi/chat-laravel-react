<?php

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\Auth\EmailVerification;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Support\Facades\Route;

//Signin Routes
Route::controller(AuthenticateController::class)->group(function () {
    Route::get('/account', 'index')->middleware(['guest'])->name('account');
    Route::get('/login', 'index')->middleware(['guest'])->name('login');
    Route::get('/user/default/password/change', 'viewDefaultPassword')->middleware(['auth'])->name('view.change.password');
    Route::patch('/user/default/password/save/change', 'changeDefaultPassword')->middleware(['auth'])->name('change.password');
    Route::post('/signin', 'signin')->middleware(['guest', 'throttle:5,1'])->name('signin');
    Route::post('/signout', 'signout')->middleware(['auth', 'throttle:3,1'])->name('signout');
});

//Signup Routes
Route::controller(RegisterController::class)->group(function () {
    Route::get('/signup', 'index')->middleware(['guest'])->name('signup');
    Route::post('/signup/create', 'create')->middleware(['guest'])->name('account.create');
});

//Email Verification
Route::controller(EmailVerification::class)->group(function () {
    Route::get('/email/verify', 'index')->middleware(['auth'])->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', 'verifyEmail')->whereNumber('id')->whereAlphaNumeric('hash')->middleware(['auth', 'signed'])->name('verification.verify');
    Route::post('/email/verification-notification', 'resendLink')->middleware(['auth', 'throttle:6,1'])->name('verification.send');
});

//Password Reset routes
Route::controller(PasswordResetController::class)->group(function () {
    Route::get('/forgotten/account', 'recoverAccountView')->middleware(['guest'])->name('forgotten.account');
    Route::get('/reset-password/{token}', 'resetPasswordView')->name('password.reset');
    Route::post('/reset-password', 'resetPassword')->name('password.update');
    Route::post('/forgot-password', 'passwordResetRequest')->middleware(['throttle:6,1'])->name('password.email');
    Route::post('/fogotten/account/receive/link', 'receiveResetPassword')->name('recover.account.email');
});