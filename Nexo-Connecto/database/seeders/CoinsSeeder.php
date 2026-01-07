<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CoinType;

class CoinsSeeder extends Seeder
{
    
    public function run(): void
    {
        $coins = require app_path('Helpers/CoinHelper.php');

        foreach ($coins as $coin) {
            CoinType::create($coin);
        }
    }
}
