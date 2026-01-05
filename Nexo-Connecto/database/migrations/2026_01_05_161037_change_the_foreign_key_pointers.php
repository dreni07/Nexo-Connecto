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
            $table->dropForeign(['user_profile_id']);
            $table->foreign('user_profile_id')->references('id')->on('profiles')->onDelete('cascade');
        });

        Schema::table('company_profiles', function (Blueprint $table) {
            $table->dropForeign(['user_profile_id']);
            $table->foreign('user_profile_id')->references('id')->on('profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropForeign(['user_profile_id']);
            $table->foreign('user_profile_id')->references('id')->on('user_profiles')->onDelete('cascade');
        });

        Schema::table('company_profiles', function (Blueprint $table) {
            $table->dropForeign(['user_profile_id']);
            $table->foreign('user_profile_id')->references('id')->on('user_profiles')->onDelete('cascade');
        });
    }
};

