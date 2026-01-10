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
        
        Schema::create('project_details', function (Blueprint $table) {
            $table->id();
            $table->string('project_title');
            $table->text('project_summary');
            $table->json('project_tags');
            $table->enum('project_difficulty',['easy','medium','hard']);
            $table->enum('project_status',['completed','beta','prototype','in_progress','concept']);

            $table->json('project_answers');

            $table->json('project_tech_stack');

            $table->json('project_learning_answers');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_details');
    }
};
