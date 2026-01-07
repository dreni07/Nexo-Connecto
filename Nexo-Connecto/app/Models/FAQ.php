<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    protected $fillable = [
        'student_questions',
        'company_questions'
    ];

    protected $casts = [
        'student_questions' => 'array',
        'company_questions' => 'array'
    ];
}
