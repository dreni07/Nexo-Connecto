<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\ProblemVersion;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submission extends Model
{
    //
    protected $fillable = [
        'user_id',
        'problem_version_id',
        'code',
        'language',
        'status',
        'output',
        'error_message',
        'execution_metadata',
        'test_cases_passed'
    ];

    protected $casts = [
        'execution_metadata' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function problemVersion(): BelongsTo
    {
        return $this->belongsTo(ProblemVersion::class);
    }
}
