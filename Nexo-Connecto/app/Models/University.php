<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\StudentProfile;

class University extends Model
{
    //
    protected $fillable = [
        'university_name',
        'university_location',
        'university_website',
        'university_logo',
        'university_description',
        'university_major'
    ];

    public function studentProfiles()
    {
        return $this->hasMany(StudentProfile::class, 'university');
    }
}


// $table->string('university_name');
// $table->string('university_location');
// $table->string('university_website');
// $table->string('university_logo');
// $table->string('university_description');
// $table->string('university_major');
