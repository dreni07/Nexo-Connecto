<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\StudentProfile;

class StudentSubjects extends Model
{
    //
    protected $fillable = [
        'student_profile_id',
        'subjects_choosen'
    ];

    protected $casts = [
        'subjects_choosen' => 'array'
    ];

    public function studentProfile()
    {
        return $this->belongsTo(StudentProfile::class);
    }
}
