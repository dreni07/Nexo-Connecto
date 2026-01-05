<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Profile extends Model
{
    //
    protected $fillable = [
        'user_id',
        'avatar',
        'bio'
    ];

  
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function studentProfile()
    {
        return $this->hasOne(StudentProfile::class, 'user_profile_id');
    }

    public function companyProfile()
    {
        return $this->hasOne(CompanyProfile::class, 'user_profile_id');
    }
}
