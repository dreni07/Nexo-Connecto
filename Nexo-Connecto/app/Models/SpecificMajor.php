<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\University;

class SpecificMajor extends Model
{
    //
    protected $fillable = [
        'university_id',
        'major_name'
    ];

    public function university()
    {
        return $this->belongsTo(University::class,'university_id');
    }
}
