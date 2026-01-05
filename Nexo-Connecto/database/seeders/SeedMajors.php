<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SpecificMajor;

class SeedMajors extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $majors = require app_path('Helpers/MajorHelper.php');

        foreach ($majors as $major) {
            SpecificMajor::create($major);
        }
    }
}
