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
        //     'language_id',
        // 'language_parameter_mapping'
        Schema::create('language_parameter_mappings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('language_id');
            $table->json('language_parameter_mapping');

            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('language_parameter_mappings');
    }
};
