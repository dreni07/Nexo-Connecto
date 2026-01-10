<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectDetail;
use App\Models\ProjectVisual;
use App\Models\User;

class Project extends Model
{
    //

    protected $fillable = [
        'user_id',
        'project_detail_id',
        'project_visual_id'
    ];

    public function projectDetail()
    {
        return $this->belongsTo(ProjectDetail::class);
    }

    public function projectVisual()
    {
        return $this->belongsTo(ProjectVisual::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
