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
        Schema::table('company_profiles',function (Blueprint $table){
            $table->unsignedBigInteger('company_industry');

            $table->enum('remote_work_policy',['fully_remote','hybrit','on_site'])->nullable();

            $table->enum('role_in_company',['CEO','CTO','CFO','HR','Tech Lead','Other'])->nullable();


            $table->string('company_location')->nullable();
            $table->text('company_description_for_students')->nullable();
            $table->string('company_name');
            $table->integer('company_number_of_employees')->nullable();

            $table->json('company_pictures')->nullable();
            $table->json('social_media')->nullable();
            $table->json('student_opportunities')->nullable();
            $table->json('student_answers');
            $table->json('company_personality')->nullable();

            $table->foreign('company_industry')->references('id')->on('industries');

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
