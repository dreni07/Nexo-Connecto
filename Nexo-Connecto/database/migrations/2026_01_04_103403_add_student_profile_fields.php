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

            $table->float('gpa');

            $table->integer('academic_year');

            $table->json('technical_skills'); // this will have also foreign-keys 

            $table->json('languages');

            $table->enum('work_preference',['remote','on-site','hybrid'])->nullable();

            $table->json('social_media');

            $table->json('industries_preferences'); // this will have foreign-keys
            
            $table->text('career_goals')->nullable();

            $table->json('student_answers');

            $table->integer('profile_completion_percentage');

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
