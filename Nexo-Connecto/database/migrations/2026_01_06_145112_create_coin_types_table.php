<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coin_types', function (Blueprint $table) {
            $table->id();
            $table->string('coin_name');
            $table->string('coin_description');
            $table->string('coin_image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coin_types');
    }
};


     // MASPARI KENA ME PAS NI TABELE QE KA ME KON PER COIN TYPES
            // QIKJO TABELA PER COIN TYPES KA ME I PAS DISA COIN TYPES QE KENA ME I RUJT
            // MASANEJ KENA ME PAS NI TABELE USER_COIN
            // QIKJO USER_COIN TABELA KA ME U KRIJU SI TE KRIJOHET USERI ME NI OBSERVER
            // MASANEJ KENA ME BO INSERT PER NI USER QESHTU:
    //         COIN_TABLE:
    //         1.COIN_NAME,
    //         2.COIN_DESCRIPTION,
    //         3.COIN_IMAGE

    //     USER_COIN_TABLE:
    //         PER N-NUMER TE COINSAVE N-RRESHTA:
    //             1.USER_ID
    //             2.COIN_ID
    //             3.NUMBER_OF_COINS

    // MVYN NI TABELE:
    //     EVENTS_TABLE:
    //         EVENT_NAME;
    //         EVENT_DESCRIPTION;
    //     EVENT_COIN:
    //         EVENT_IDS:[], // EVENT_IDS SHKOJN EDHE TA JAPIN QIT COIN
    //         COIN_ID:    


    //         1.coin_type
    //         2.events 
    //         3.event_coin
    //         4.event_coin_reward
    //             1.event_id
    //             2.coin_id 
    //             3.base_amount_of_reward
    //         5.user_coin