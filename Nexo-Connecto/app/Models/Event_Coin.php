<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event_Coin extends Model
{
    //
    protected $fillable = [
        'event_ids',
        'coin_id'
    ];

    public function coin()
    {
        return $this->belongsTo(CoinType::class);
    }
}
