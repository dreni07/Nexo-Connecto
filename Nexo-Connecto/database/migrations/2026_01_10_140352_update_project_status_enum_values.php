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
        Schema::table('project_details', function (Blueprint $table) {
            $table->dropColumn('project_status');
        });

        Schema::table('project_details', function (Blueprint $table) {
            $table->enum('project_status', ['completed', 'beta', 'prototype', 'in_progress', 'concept'])
                ->after('project_difficulty')
                ->default('concept');
        });
    }

    public function down(): void
    {
        Schema::table('project_details', function (Blueprint $table) {
            $table->dropColumn('project_status');
        });

        Schema::table('project_details', function (Blueprint $table) {
            $table->enum('project_status', ['completed', 'beta', 'prototype', 'In Progress', 'concept'])
                ->after('project_difficulty');
        });
    }
};
