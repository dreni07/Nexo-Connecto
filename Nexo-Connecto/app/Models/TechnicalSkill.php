<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Industry;

class TechnicalSkill extends Model
{
    //
    protected $fillable = [
        'skill_name',
        'skill_description',
        'industry'
    ];

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'industry');
    }

}
