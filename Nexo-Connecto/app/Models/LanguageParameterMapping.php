<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Language;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class LanguageParameterMapping extends Model
{
    //

    protected $fillable = [
        'language_id',
        'language_parameter_mapping'
    ];

    protected $casts = [
        'language_parameter_mapping' => 'array'
    ];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
