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
        Schema::create('problem_versions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('problem_id');
            $table->string('version');
            $table->string('prompt');
            $table->string('constraints');
            $table->json('test_cases'); // test cases will look like this: [{"input":"Some Input","output":"Some Output","visible":true or false}]
            $table->json('sample_output_input');
            $table->string('official_solution');
            $table->string('checksum');

            $table->foreign('problem_id')->references('id')->on('problems')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('problem_versions');
    }
};
