<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentProfile extends Controller
{
    //
    public function index()
    {
        return Inertia::render('StudentRole/StudentProfile/pages/Index');
    }
}
