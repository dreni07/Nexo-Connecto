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
        // so at the first button-click when the user submits the code
        // we are going to create a instance and we are going to fill the user_id,problem_version_id,code,language,and status
        // then after the test cases actually run on the background, we get the output,error_message,test_cases_passed
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('problem_version_id');
            $table->text('code');
            $table->string('language');
            $table->enum('status',['pending','completed','failed']);

            $table->text('output')->nullable();
            $table->text('error_message')->nullable();
            $table->json('execution_metadata')->nullable();

            $table->integer('test_cases_passed')->default(0);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('problem_version_id')->references('id')->on('problem_versions')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
