<?php

namespace App\Services;

use App\Models\User;
use App\Models\CoinType;
use App\Models\User_Coin;

class UserObserverService
{
   
    public function initializeUserCoins(User $user): void
    {
        $coinTypes = CoinType::all();

        foreach ($coinTypes as $coinType) {
            User_Coin::create([
                'user_id' => $user->id,
                'coin_id' => $coinType->id,
                'number_of_coins' => 0,
            ]);
        }
    }
}

