<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Problem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProblemVersion extends Model
{
    //
    protected $fillable = [
        'problem_id',
        'version',
        'prompt',
        'test_cases',
        'constraints',
        'sample_output_input',
        'official_solution',
        'checksum',
        'constraints_structure'
    ];

    protected $casts = [
        'sample_output_input' => 'array',
        'test_cases' => 'array',
        'constraints_structure' => 'array'
    ];

    public function problem(): BelongsTo
    {
        return $this->belongsTo(Problem::class);
    }
  
}
