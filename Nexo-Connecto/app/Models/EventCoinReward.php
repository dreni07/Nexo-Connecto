<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;
use App\Models\CoinType;

class EventCoinReward extends Model
{
    //
    protected $fillable = [
        'event_id',
        'coin_id',
        'base_amount_of_reward'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function coin()
    {
        return $this->belongsTo(CoinType::class);
    }
}
