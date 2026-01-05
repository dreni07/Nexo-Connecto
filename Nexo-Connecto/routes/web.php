<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LandingPage;
use App\Http\Controllers\CompanyAuthentication;
use App\Http\Controllers\ThirdPartyAuthentication;
use App\Http\Controllers\Registration;
use App\Http\Controllers\CompanyDashboard;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentDashboard;
use App\Http\Controllers\StudentProfile;

Route::controller(LandingPage::class)->middleware('web')->group(function () {
    Route::get('/','index');
});

Route::controller(CompanyDashboard::class)->middleware(['web','auth','role.company','profile.exists'])->group(function () {
    Route::get('company/dashboard','index')->name('company.dashboard');
});



Route::prefix('student')->middleware(['web','auth','role.student'])->group(function() {
    Route::controller(StudentDashboard::class)->middleware('profile.exists')->group(function() {
        Route::get('/dashboard','index')->name('student.dashboard');
    });

    Route::controller(StudentProfile::class)->group(function() {
        Route::get('/create-profile','index')->name('student.profile.index');
        Route::get('/specific-majors','getSpecificMajors')->name('student.profile.majors');
        Route::get('/course-subjects','getCourseSubjects')->name('student.profile.course-subjects');
        Route::post('/complete-profile','completeProfile')->name('student.profile.complete');
    });
});


Route::controller(CompanyAuthentication::class)->middleware('web','guest')->group(function () {
    Route::get('/company/onboarding','onboard_page')->name('company.onboarding');  
});

Route::controller(AuthController::class)->middleware('web')->group(function(){
    Route::get('/register','register_page')->name('register.view');
    Route::post('/register','register')->name('register');

    Route::get('/login','login_page')->name('login.view');
    Route::post('/login','login')->name('login');
});

Route::controller(ThirdPartyAuthentication::class)->middleware('web','guest')->group(function () {
    Route::get('/auth/{provider}', 'redirect')->name('auth.provider');
    Route::get('/auth/{provider}/callback', 'callback')->name('auth.provider.callback');
});


Route::controller(VerifyController::class)->middleware(['web','auth','email.not.verified'])->group(function () {
    Route::get('/verify','verify')->name('verify');

    Route::post('/verify/handle-request','handleRequest')->name('verify.handle-request');
    Route::post('/verify/verify-code','verifyCode')->name('verify.verify-code');
});

Route::prefix('company')->middleware(['web','auth','role.company'])->group(function() {
    Route::controller(Registration::class)->group(function () {
        Route::post('/register','create_account')->name('register.create_account');
    });
    
    Route::controller(CompanyAuthentication::class)->group(function () {
        Route::get('/create-profile','onboard_page')->name('company.profile.create');
    });
});



require __DIR__.'/settings.php';
