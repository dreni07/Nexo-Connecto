<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FAQ;


class FAQSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faq = [
            'student_questions' => [
                ''
            ],
            'company_questions' => [
                'Are you open to extending the internship if it goes well?',
                'How confident are you working independently?',
                'Do you prefer structured guidance or more autonomy?',
                'Are you comfortable working in a team environment?'
            ]
        ];

        FAQ::create($faq);
    }
}
