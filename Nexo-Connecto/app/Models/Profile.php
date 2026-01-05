<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Profile extends Model
{
    //
    protected $fillable = [
        'user_id',
        'avatar',
        'bio'
    ];

    // fakultetin
    // drejtimi


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
