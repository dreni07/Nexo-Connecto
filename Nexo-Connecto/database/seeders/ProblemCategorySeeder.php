<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProblemCategory;


class ProblemCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $problemCategories = require app_path('Helpers/ProblemCategoryHelper.php');

        foreach ($problemCategories as $problemCategory){
            ProblemCategory::create($problemCategory);
        }
    }
}
