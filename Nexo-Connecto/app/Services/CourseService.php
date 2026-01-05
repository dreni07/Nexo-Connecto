<?php

namespace App\Services;

use App\Models\Course;
use Exception;

class CourseService
{
   
    public function saveCourseSubjects(int $majorId, string $extractedSubjects)
    {
        try {
            $subjectsArray = json_decode($extractedSubjects, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                if (preg_match('/```json\s*(.*?)\s*```/s', $extractedSubjects, $matches)) {
                    $subjectsArray = json_decode($matches[1], true);
                } elseif (preg_match('/```\s*(.*?)\s*```/s', $extractedSubjects, $matches)) {
                    $subjectsArray = json_decode($matches[1], true);
                } elseif (preg_match('/\{.*\}/s', $extractedSubjects, $matches)) {
                    $subjectsArray = json_decode($matches[0], true);
                }
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Invalid JSON format in extracted subjects: " . json_last_error_msg());
                }
            }
            
            $course = Course::updateOrCreate(
                ['major_id' => $majorId],
                ['course_details' => $subjectsArray]
            );
            
            return $course;
            
        } catch (Exception $e) {
            throw new Exception("Error saving course subjects: " . $e->getMessage());
        }
    }
}

