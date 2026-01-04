<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;

class StudentProfile extends Model
{
    //
    protected $fillable = [
        'user_profile_id'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
