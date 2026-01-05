<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\StudentProfileService;

class StudentProfile extends Controller
{
    protected $studentProfileService;

    public function __construct(StudentProfileService $studentProfileService)
    {
        $this->studentProfileService = $studentProfileService;
    }

    public function index()
    {
        $universities = $this->studentProfileService->getUniversities();
        
        return Inertia::render('StudentRole/StudentProfile/pages/Index', [
            'universities' => $universities,
        ]);
    }

    public function getSpecificMajors(Request $request)
    {
        $universityId = $request->query('university_id');
        
        if (!$universityId) {
            return response()->json([
                'success' => false,
                'message' => 'University ID is required',
            ], 400);
        }
        
        $result = $this->studentProfileService->getSpecificMajors((int)$universityId);
        
        return response()->json($result);
    }

    public function getCourseSubjects(Request $request)
    {
        $majorId = $request->query('major_id');
        $year = $request->query('year');
        
        if (!$majorId) {
            return response()->json([
                'success' => false,
                'message' => 'Major ID is required',
            ], 400);
        }
        
        if (!$year) {
            return response()->json([
                'success' => false,
                'message' => 'Year is required',
            ], 400);
        }
        
        $result = $this->studentProfileService->getCourseSubjects((int)$majorId, (int)$year);
        
        $statusCode = $result['success'] ? 200 : 404;
        
        return response()->json($result, $statusCode);
    }

    public function completeProfile(Request $request)
    {
        $request->validate([
            'bio' => 'required|string',
            'specific_major' => 'required|integer',
            'degree_level' => 'required|string',
            'academic_year' => 'required|integer',
            'subjects_choosen' => 'required|string', 
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user = $request->user();
        $avatarPath = null;

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $userProfileId = $this->studentProfileService->createProfile(
            $user->id,
            $avatarPath,
            $request->bio
        );

        $studentProfileId = $this->studentProfileService->createStudentProfile(
            $userProfileId,
            (int)$request->specific_major,
            $request->degree_level,
            (int)$request->academic_year
        );

        $this->studentProfileService->createStudentSubjects(
            $studentProfileId,
            json_decode($request->subjects_choosen, true)
        );

        return response()->json([
            'success' => true,
            'message' => 'Profile completed successfully',
        ]);
    }
}
