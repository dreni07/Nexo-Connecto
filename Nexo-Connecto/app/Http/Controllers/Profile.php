<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Profile as ProfileService;
use Illuminate\Support\Facades\Auth;

class Profile extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function index(Request $request)
    {
        $hashedId = $request->query('id');

        [$user, $isOwnProfile] = $this->profileService->resolveProfileUser($hashedId);
        $skillsData = $this->profileService->getUserSkills($user);

        $userDetails = [
            'id' => base64_encode($user->id), 
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->profile?->avatar ?? null,
            'university' => $user->profile?->studentProfile?->specificMajor?->university?->university_name ?? 'Not Specified',
            'skills' => $skillsData['skills'],
            'industry' => $skillsData['industry'],
        ];

        return Inertia::render('StudentRole/pages/Profile', [
            'profile_user' => $userDetails,
            'is_own_profile' => $isOwnProfile
        ]);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        try {
            $this->profileService->updateAvatar(Auth::user(), $request->file('avatar'));
            return back()->with('success', 'Avatar updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getIndustries()
    {
        $industries = $this->profileService->getIndustries();
        return response()->json($industries);
    }

    public function getTechnicalSkills(Request $request)
    {
        $industryId = $request->query('industry_id');
        if (!$industryId) {
            return response()->json([], 400);
        }

        $skills = $this->profileService->getTechnicalSkillsByIndustry((int)$industryId);
        return response()->json($skills);
    }

    public function updateSkills(Request $request)
    {
        $request->validate([
            'skills' => 'required|array|max:10',
            'skills.*' => 'integer|exists:technical_skills,id'
        ]);

        try {
            $this->profileService->updateStudentSkills($request->user(), $request->skills);
            return back()->with('success', 'Technical skills updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
