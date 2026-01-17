<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $languages = [
            [
                'language_name' => 'JavaScript',
                'language_api_name' => 'javascript'
            ],
            [
                'language_name' => 'Python',
                'language_api_name' => 'python3'
            ],
            [
                'language_name' => 'Java',
                'language_api_name' => 'java'
            ],
            [
                'language_name' => 'C++',
                'language_api_name' => 'cpp'
            ],
            [
                'language_name' => 'C#',
                'language_api_name' => 'csharp'
            ],
            [
                'language_name' => 'PHP',
                'language_api_name' => 'php'
            ],
            [
                'language_name' => 'Ruby',
                'language_api_name' => 'ruby3'
            ]
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }

    }
}
