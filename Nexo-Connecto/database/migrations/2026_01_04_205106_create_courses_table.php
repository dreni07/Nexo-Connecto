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

        Schema::create('courses', function (Blueprint $table) {
           
            $table->id();
            $table->unsignedBigInteger('major_id');

            $table->json('course_details'); // this will hold the classes and the 
            // details about each class on each year

            $table->foreign('major_id')->references('id')->on('specific_majors');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
