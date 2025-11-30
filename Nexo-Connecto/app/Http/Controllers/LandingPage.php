<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPage extends Controller
{
    //
    public function index()
    {
        return Inertia::render('LandingPage/Index');
    }
}
