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
        Schema::table('student_profiles',function(Blueprint $table) {
            $table->unsignedBigInteger('university');

            $table->enum('degree_level',['Bachelor','Master','PhD']);

            $table->float('gpa')->nullable();

            $table->integer('academic_year');

            $table->json('technical_skills')->nullable(); // this will have also foreign-keys 

            $table->json('languages')->nullable();

            $table->enum('work_preference',['remote','on-site','hybrid'])->nullable();

            $table->json('social_media')->nullable();

            $table->json('industries_preferences')->nullable(); // this will have foreign-keys
            
            $table->text('career_goals')->nullable();

            $table->json('student_answers')->nullable();

            $table->integer('profile_completion_percentage')->nullable();

            $table->foreign('university')->references('id')->on('universities');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
