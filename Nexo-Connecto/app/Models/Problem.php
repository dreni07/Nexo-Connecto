<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProblemCategory;
use App\Models\ProblemVersion;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Problem extends Model
{
    protected $fillable = [
        'problem_title',
        'description',
        'difficulty',
        'status'
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProblemCategory::class,'problem_category_pivot');
    }

    public function versions(): HasMany
    {
        return $this->hasMany(ProblemVersion::class);
    }
}
