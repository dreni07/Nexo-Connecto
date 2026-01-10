<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectDetail extends Model
{
    //
    protected $fillable = [
        'project_title',
        'project_summary', // short summary 
        'project_tags',
        'project_difficulty', // sa u kon i vshtir prej perspektives te studentit
        'project_status', // e run status-in se a osht tu o develop a osht i krym
        'project_answers', // json qe i run pergjigjet e pytjeve ma bazike per projektin
        'project_tech_stack', // json qe e run tech-stack-un e projektit
        'project_learning_answers' // json qe pergjigjet
        // pytjeve per senet qe i kan msu gjat projektit
    ];

    protected $casts = [
        'project_answers' => 'array',
        'project_tech_stack' => 'array',
        'project_learning_answers' => 'array'
    ];
}
