<?php

namespace Database\Seeders;

use App\Models\TechnicalSkill;
use App\Models\Industry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddTechnicalSkills extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technicalSkills = require app_path('Helpers/TechnicalSkillsHelper.php');

        foreach ($technicalSkills as $skill) {
            $industry = Industry::where('industry_name', $skill['industry'])->first();
            
            TechnicalSkill::create([
                'skill_name' => $skill['skill_name'],
                'skill_description' => $skill['skill_description'],
                'industry' => $industry->id,
            ]);
        }
    }
}
