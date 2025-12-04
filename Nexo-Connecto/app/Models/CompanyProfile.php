<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;

class CompanyProfile extends Model
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
