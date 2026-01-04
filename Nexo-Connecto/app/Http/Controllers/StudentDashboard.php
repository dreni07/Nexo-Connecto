<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudentDashboard extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        // extract only the neccessary user details
        $user_details = [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar
        ];

        return Inertia::render('StudentRole/pages/Index',compact('user_details'));
    }
}
