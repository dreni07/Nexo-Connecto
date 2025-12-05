<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LandingPage;
use App\Http\Controllers\CompanyAuthentication;
use App\Http\Controllers\ThirdPartyAuthentication;
use App\Http\Controllers\Registration;
use App\Http\Controllers\CompanyDashboard;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::controller(LandingPage::class)->middleware('web','guest')->group(function () {
    Route::get('/','index');
});

Route::controller(CompanyDashboard::class)->group(function () {
    Route::get('company/dashboard','index')->name('company.dashboard');
});


Route::controller(CompanyAuthentication::class)->middleware('web','guest')->group(function () {
    Route::get('/company/onboarding','onboard_page')->name('company.onboarding');  
});

Route::controller(ThirdPartyAuthentication::class)->middleware('web','guest')->group(function () {
    Route::get('/auth/{provider}', 'redirect')->name('auth.provider');
    Route::get('/auth/{provider}/callback', 'callback')->name('auth.provider.callback');
});

Route::controller(Registration::class)->middleware('web','guest')->group(function () {
    Route::post('/company/register','create_account')->name('register.create_account');
});

Route::get('/perqef',function () {
    return response()->json(['message' => 'Hello World']);
})->middleware('auth')->name('perqef');

require __DIR__.'/settings.php';
