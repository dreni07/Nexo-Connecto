<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;
use App\Models\Industry;

class CompanyProfile extends Model
{
    protected $fillable = [
        'user_profile_id',
        'company_industry',
        'remote_work_policy',
        'role_in_company',
        'company_location',
        'company_description_for_students',
        'company_name',
        'company_number_of_employees',
        'company_pictures',
        'social_media',
        'student_opportunities',
        'student_answers',
        'company_personality',
    ];

    protected $casts = [
        'company_pictures' => 'array',
        'social_media' => 'array',
        'student_opportunities' => 'array',
        'student_answers' => 'array',
        'company_personality' => 'array',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class, 'user_profile_id');
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'company_industry');
    }
}
