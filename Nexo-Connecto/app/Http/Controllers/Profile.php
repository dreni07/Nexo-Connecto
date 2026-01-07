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

    public function updateGpa(Request $request)
    {
        $request->validate([
            'gpa' => 'required|numeric|between:0,4.0'
        ]);

        try {
            $this->profileService->updateStudentGpa($request->user(), (float)$request->gpa);
            return back()->with('success', 'GPA updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updateLanguages(Request $request)
    {
        $request->validate([
            'languages' => 'required|array',
            'languages.*.language' => 'required|string',
            'languages.*.level' => 'required|string|in:Native,Fluent,Advanced,Basic,Beginner'
        ]);

        try {
            $this->profileService->updateStudentLanguages($request->user(), $request->languages);
            return back()->with('success', 'Languages updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updateWorkPreference(Request $request)
    {
        $request->validate([
            'work_preference' => 'required|string|in:remote,on-site,hybrid'
        ]);

        try {
            $this->profileService->updateStudentWorkPreference($request->user(), $request->work_preference);
            return back()->with('success', 'Work preference updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updateSocialMedia(Request $request)
    {
        $request->validate([
            'social_media' => 'required|array',
            'social_media.*.name' => 'required|string',
            'social_media.*.link' => 'required|url'
        ]);

        try {
            $this->profileService->updateStudentSocialMedia($request->user(), $request->social_media);
            return back()->with('success', 'Social media links updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updateCareerGoals(Request $request)
    {
        $request->validate([
            'career_goals' => 'required|string|min:10|max:1000'
        ]);

        try {
            $this->profileService->updateStudentCareerGoals($request->user(), $request->career_goals);
            return back()->with('success', 'Career goals updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getQuizQuestions()
    {
        $questions = $this->profileService->getStudentQuizQuestions();
        return response()->json($questions);
    }

    public function updateQuizAnswers(Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*.question' => 'required|string',
            'answers.*.answer' => 'required|string'
        ]);

        try {
            $this->profileService->updateStudentQuizAnswers($request->user(), $request->answers);
            return back()->with('success', 'Quiz answers saved successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
