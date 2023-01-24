<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\General\HomeController;

Route::middleware(['guest'])->group(function () {
    Route::controller(HomeController::class)->group(function () {
        Route::get('/', 'index')->name('root');
        Route::get('/home', 'index')->name('home');
    });
});
