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
        Schema::table('problem_versions',function(Blueprint $table){
            $table->json('constraints_structure')->nullable();
            $table->text('checksum')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('problem_versions',function(Blueprint $table){
            $table->dropColumn('constraints_structure');
            $table->text('checksum')->nullable(false)->change();
        });
    }
};
