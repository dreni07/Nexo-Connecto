<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Language;


class ProblemTemplate extends Model
{
    //

    protected $fillable = [
        'language_id',
        'template'
    ];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

}
