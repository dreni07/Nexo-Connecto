<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;

class StudentProfile extends Model
{
    //
    protected $fillable = [
        'user_profile_id',
        'university', // university ka me kon foreign-key,sepse na duhet ni tabele
        // per universitet,sepse normalisht na duhen mashum info per unviersitetin se sa vetem emri
        'degree_level',
        'gpa',
        'academic_year',
        'technical_skills', // na vyn per ni student/studente me dit technical skills
        // qe aj i ka,si p.sh web-development,AI,back-end,front-end etc.
        'languages',
        'work_preference',
        'social_media',
        'industries_preferences',
        'career_goals', // this one will be just text telling about the career
        // goals, this student has
        'student_answers',
        'profile_completion_percentage'
    ];

    protected $casts = [
        'technical_skills' => 'array',
        'languages' => 'array',
        'social_media' => 'array',
        'industries_preferences' => 'array', // kjo ka me i mbajt
        // industry_id's, prej tabeles Industries qe e kemi kriju
        'student_answers' => 'array'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
