<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyDashboard extends Controller
{
    //
    public function index()
    {
        return Inertia::render('CompanyRole/pages/Index');        
    }
}
