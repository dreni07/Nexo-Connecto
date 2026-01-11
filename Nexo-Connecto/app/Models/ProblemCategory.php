<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Problem;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProblemCategory extends Model
{
    //

    protected $fillable = [
        'category_name',
        'category_description',
        'sort_order',
        'is_active',
        'meta',
        'tags'
    ];

    protected $casts = [
        'meta' => 'array',
        'tags' => 'array'
    ];

    public function problems(): BelongsToMany
    {
        return $this->belongsToMany(Problem::class,'problem_category_pivot');
    }
}
