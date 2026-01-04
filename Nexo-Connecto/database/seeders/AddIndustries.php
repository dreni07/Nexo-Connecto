<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Industry;


class AddIndustries extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $industries = require app_path('Helpers/IndustriesHelper.php');

        foreach ($industries as $industry) {
            Industry::create($industry);
        }
    }
}
