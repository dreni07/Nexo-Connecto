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
        Schema::create('event__coins', function (Blueprint $table) {
            $table->id();
            $table->json('event_ids');
            $table->unsignedBigInteger('coin_id');
            $table->foreign('coin_id')->references('id')->on('coin_types')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event__coins');
    }
};
