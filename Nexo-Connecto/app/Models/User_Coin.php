<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\CoinType;


class User_Coin extends Model
{
    //

    protected $fillable = [
        'user_id',
        'coin_id',
        'number_of_coins'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function coin()
    {
        return $this->belongsTo(CoinType::class);
    }
}
