<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\ProblemTemplate;

class Language extends Model
{
    protected $fillable = [
        'language_name'
    ];

    public function template(): HasOne
    {
        return $this->hasOne(ProblemTemplate::class);
    }
}
