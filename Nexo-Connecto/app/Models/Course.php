<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\SpecificMajor;

class Course extends Model
{
    //
    protected $fillable = [
        'major_id',
        'course_details',
    ];

    protected $casts = [
        'course_details' => 'array'
    ];

    public function major()
    {
        return $this->belongsTo(SpecificMajor::class);
    }
}
