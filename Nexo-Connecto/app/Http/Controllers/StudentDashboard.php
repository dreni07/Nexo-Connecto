<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\StudentProfileService;

class StudentDashboard extends Controller
{
    protected $studentProfileService;

    public function __construct(StudentProfileService $studentProfileService)
    {
        $this->studentProfileService = $studentProfileService;
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $user_details = [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar
        ];

        $profile_completion = $this->studentProfileService->getProfileCompletionStatus($user->id);

        $recent_projects = $this->studentProfileService->getRecentProjects($user->id);

        return Inertia::render('StudentRole/pages/Index', [
            'user_details' => $user_details,
            'profile_completion' => $profile_completion,
            'recent_projects' => $recent_projects
        ]);
    }
}

