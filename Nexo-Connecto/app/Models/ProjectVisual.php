<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectVisual extends Model
{
    //
    protected $fillable = [
        'images',
        'live_demo',
        'github_link'
    ];
}
