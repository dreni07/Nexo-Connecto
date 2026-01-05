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

            $table->float('gpa')->nullable()->change();
            $table->json('technical_skills')->nullable()->change();
            $table->json('languages')->nullable()->change();
            $table->json('social_media')->nullable()->change();
            $table->json('industries_preferences')->nullable()->change();
            $table->json('student_answers')->nullable()->change();
            $table->integer('profile_completion_percentage')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->float('gpa')->nullable(false)->change();
            $table->json('technical_skills')->nullable(false)->change();
            $table->json('languages')->nullable(false)->change();
            $table->json('social_media')->nullable(false)->change();
            $table->json('industries_preferences')->nullable(false)->change();
            $table->json('student_answers')->nullable(false)->change();
            $table->integer('profile_completion_percentage')->nullable(false)->change();
        });
    }
};

