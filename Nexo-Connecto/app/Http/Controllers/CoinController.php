<?php

namespace App\Http\Controllers;

use App\Models\CoinType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoinController extends Controller
{
    public function getCoins()
    {
        return response()->json(CoinType::all());
    }

    public function getUserCoins()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([], 401);
        }

        $coins = CoinType::all()->map(function ($coinType) use ($user) {
            $userCoin = $user->coins()->where('coin_id', $coinType->id)->first();
            return [
                'id' => $coinType->id,
                'coin_name' => $coinType->coin_name,
                'coin_image' => $coinType->coin_image,
                'balance' => $userCoin ? $userCoin->number_of_coins : 0
            ];
        });

        return response()->json($coins);
    }

    public function markIntroAsSeen(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $user->update(['has_seen_coins_intro' => true]);
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false], 401);
    }
}
