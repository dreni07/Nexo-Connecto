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

    /**
     * Ensure test_cases is always an array.
     */
    protected function getTestCasesAttribute($value)
    {
        if (is_array($value)) return $value;
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Ensure sample_output_input is always an array.
     */
    protected function getSampleOutputInputAttribute($value)
    {
        if (is_array($value)) return $value;
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Ensure constraints_structure is always an array.
     */
    protected function getConstraintsStructureAttribute($value)
    {
        if (is_array($value)) return $value;
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function problem(): BelongsTo
    {
        return $this->belongsTo(Problem::class);
    }
  
}
