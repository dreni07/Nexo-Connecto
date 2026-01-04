<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyAuthentication extends Controller
{
    //
    public function onboard_page() 
    {
        return Inertia::render('Authentication/CompanyAuthentication/Onboarding');
    }

    
}
