<?php

namespace App\Services;

use App\Models\University;
use App\Models\SpecificMajor;
use App\Models\Course;

use App\Models\Profile;
use App\Models\StudentProfile;
use App\Models\StudentSubjects;

class StudentProfileService
{
    public function createProfile(int $userId, ?string $avatar, string $bio): int
    {
        $profile = Profile::create([
            'user_id' => $userId,
            'avatar' => $avatar,
            'bio' => $bio,
        ]);

        return $profile->id;
    }

    public function createStudentProfile(int $userProfileId, int $specificMajorId, string $degreeLevel, int $academicYear): int
    {
        $studentProfile = StudentProfile::create([
            'user_profile_id' => $userProfileId,
            'specific_major' => $specificMajorId,
            'degree_level' => $degreeLevel,
            'academic_year' => $academicYear,
            'profile_completion_percentage' => 30, 
        ]);

        return $studentProfile->id;
    }

    public function createStudentSubjects(int $studentProfileId, array $subjectsChosen): void
    {
        StudentSubjects::create([
            'student_profile_id' => $studentProfileId,
            'subjects_choosen' => $subjectsChosen,
        ]);
    }

    public function getUniversities(): array
    {
        return University::all()->map(function ($university) {
            return [
                'id' => $university->id,
                'name' => $university->university_name,
                'location' => $university->university_location,
                'logo' => $university->university_logo,
                'description' => $university->university_description,
            ];
        })->toArray();
    }

    public function getSpecificMajors(int $universityId): array
    {
        $majors = SpecificMajor::where('university_id', $universityId)
            ->get()
            ->map(function ($major) {
                return [
                    'id' => $major->id,
                    'name' => $major->major_name,
                ];
            });

        return [
            'success' => true,
            'majors' => $majors->toArray(),
        ];
    }

    public function getCourseSubjects(int $majorId, int $year): array
    {
        $course = Course::where('major_id', $majorId)->first();

        if (!$course) {
            return [
                'success' => false,
                'message' => 'Course not found for this major',
            ];
        }

        $courseDetails = $course->course_details;

        if (!$courseDetails || !is_array($courseDetails)) {
            return [
                'success' => false,
                'message' => 'Course details not available',
            ];
        }

        $yearKey = 'year ' . $year;
        $yearData = $courseDetails[$yearKey] ?? null;

        if (!$yearData) {
            return [
                'success' => false,
                'message' => 'Subjects not found for the selected year',
            ];
        }

        $subjects = is_array($yearData) ? $yearData : [];

        $formattedSubjects = array_map(function($subject) {
            if (is_string($subject)) {
                return ['name' => $subject];
            } elseif (is_array($subject) && isset($subject['name'])) {
                return $subject;
            } elseif (is_array($subject)) {
                return ['name' => $subject['name'] ?? (string)reset($subject) ?? 'Unknown Subject'];
            } else {
                return ['name' => (string)$subject];
            }
        }, $subjects);

        return [
            'success' => true,
            'subjects' => $formattedSubjects,
        ];
    }

    public function saveBasicProfileDetails() 
    {

        // 'user_profile_id',
        // 'specific_major', // university ka me kon foreign-key,sepse na duhet ni tabele
        // // per universitet,sepse normalisht na duhen mashum info per unviersitetin se sa vetem emri
        // 'degree_level',
        // 'gpa',
        // 'academic_year',
        // 'technical_skills', // na vyn per ni student/studente me dit technical skills
        // // qe aj i ka,si p.sh web-development,AI,back-end,front-end etc.
        // 'languages',
        // 'work_preference',
        // 'social_media',
        // 'industries_preferences',
        // 'career_goals', // this one will be just text telling about the career
        // // goals, this student has
        // 'student_answers',
        // 'profile_completion_percentage'
        // profile details per student qa une muna edhe duhet per me i rujten jane
        // 'user_id',
        // 'avatar',
        // 'bio'
        // 1.user_id
        // 2.avatar (fotoja qe useri bon upload)
        // 3.bio
        // 4.Masi te krijohet profili i studentit, shkoj e marr user_profile_id 
        // 5.specific_major (qe ky specific_major ka me kan foreign-key me specific_majors table)
        // 6.degree_level (e dina qe degree_level osht enum edhe ka mekon ose Bachelor ose Master ose PhD)  
        // 7.academic_year (e marrum academic_year)
        // 8.Masi te krijojm domethane student_profile shkojm edhe e krijojm instancen per StudentSubjects table
        // ku e bojm pass student_profile_id qe e kemi kriju edhe e bojm pass subjects_choosen qe e kemi marr prej front-endit
    }


    public function getProfileCompletionStatus(int $userId): array
    {
        $profile = Profile::where('user_id', $userId)->first();
        
        $fieldsToCheck = [
            'specific_major',
            'degree_level',
            'gpa',
            'academic_year',
            'technical_skills',
            'languages',
            'work_preference',
            'social_media',
            'industries_preferences',
            'career_goals',
            'student_answers'
        ];

        if (!$profile) {
            return [
                'non_empty_fields' => [],
                'empty_fields' => $fieldsToCheck
            ];
        }

        $studentProfile = StudentProfile::where('user_profile_id', $profile->id)->first();
        
        if (!$studentProfile) {
            return [
                'non_empty_fields' => [],
                'empty_fields' => $fieldsToCheck
            ];
        }

        $nonEmptyFields = [];
        $emptyFields = [];

        foreach ($fieldsToCheck as $field) {
            $value = $studentProfile->$field;
            $isEmpty = false;

            if (is_null($value)) {
                $isEmpty = true;
            } elseif (is_array($value) && empty($value)) {
                $isEmpty = true;
            } elseif (is_string($value) && trim($value) === '') {
                $isEmpty = true;
            }

            if ($isEmpty) {
                $emptyFields[] = $field;
            } else {
                $nonEmptyFields[] = $field;
            }
        }

        return [
            'non_empty_fields' => $nonEmptyFields,
            'empty_fields' => $emptyFields
        ];
    }

}

