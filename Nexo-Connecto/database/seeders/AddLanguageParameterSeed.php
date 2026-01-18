<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LanguageParameterMapping;

class AddLanguageParameterSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $languageParameterMappings = [
            [
                'language_id' => 1,
                'language_parameter_mapping' => [
                    'number' => '',
                    'string' => '',
                    'boolean' => '',
                    'array' => '',
                    'hash-map' => '',
                    'set' => '',
                    'function-callback' => '',
                ]
            ],
            [
                'language_id' => 2,
                'language_parameter_mapping' => [
                    'number' => '',
                    'string' => '',
                    'boolean' => '',
                    'array' => '',
                    'hash-map' => '',
                    'set' => '',
                    'function-callback' => '',
                ]
            ],
            [
                'language_id' => 3,
                'language_parameter_mapping' => [
                    'number' => 'int',
                    'string' => 'String',
                    'boolean' => 'boolean',
                    'array' => '[]',
                    'hash-map' => 'Map<>',
                    'set' => 'Set<>',
                    'function-callback' => 'function<>'
                ]
            ],
            [
                'language_id' => 4,
                'language_parameter_mapping' => [
                    'number' => 'int',
                    'string' => 'string',
                    'boolean' => 'bool',
                    'array' => '[]',
                    'hash-map' => 'unordered_map<>',
                    'set' => 'set<>',
                    'function-callback' => 'function<>'
                ]
            ],
            [
                'language_id' => 5,
                'language_parameter_mapping' => [
                    'number' => 'int',
                    'string' => 'string',
                    'boolean' => 'bool',
                    'array' => '[]',
                    'hash-map' => 'Dictionary<>',
                    'set' => 'HashSet<>',
                    'function-callback' => 'Func<>'
                ]
            ],
            [
                'language_id' => 6,
                'language_parameter_mapping' => [
                    'number' => 'int',
                    'string' => 'string',
                    'boolean' => 'bool',
                    'array' => 'array',
                    'hash-map' => 'array',
                    'set' => 'array',
                    'function-callback' => 'callable'
                ]
            ]
        ];

        foreach ($languageParameterMappings as $languageParameterMapping) {
            LanguageParameterMapping::create($languageParameterMapping);
        }
    }
}
