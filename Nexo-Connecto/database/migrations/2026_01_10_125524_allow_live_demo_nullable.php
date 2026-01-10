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
        //
        Schema::table('project_visuals', function (Blueprint $table) {
            $table->string('live_demo')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('project_visuals', function (Blueprint $table) {
            $table->string('live_demo')->nullable(false)->change();
        });
    }
};
