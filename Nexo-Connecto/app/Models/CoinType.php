<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoinType extends Model
{
    protected $fillable = ['coin_name', 'coin_description', 'coin_image','coin_explained_description'];
}
