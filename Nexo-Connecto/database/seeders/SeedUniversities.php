<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\University;

class SeedUniversities extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $universities = require app_path('Helpers/UniversityHelper.php');

        foreach ($universities as $university) {
            University::create($university);
        }
    }
}
