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
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropForeign(['university']);
            
            $table->dropColumn('university');
            
            $table->unsignedBigInteger('specific_major')->nullable()->after('user_profile_id');
            
            $table->foreign('specific_major')->references('id')->on('specific_majors')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropForeign(['specific_major']);
            
            $table->dropColumn('specific_major');
            
            $table->unsignedBigInteger('university')->after('user_profile_id');
            
            $table->foreign('university')->references('id')->on('universities')->onDelete('cascade');
        });
    }
};
