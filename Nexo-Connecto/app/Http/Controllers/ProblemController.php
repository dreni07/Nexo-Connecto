<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProblemController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('StudentRole/Problems/pages/Index');
    }
}
