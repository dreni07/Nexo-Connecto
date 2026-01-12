<?php

namespace App\Filament\Resources\ProblemVersions\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Get;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;

class ProblemVersionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Information')
                    ->columns(2)
                    ->schema([
                        Select::make('problem_id')
                            ->relationship('problem', 'problem_title')
                            ->default(request()->query('problem_id'))
                            ->disabled(fn ($operation) => $operation === 'edit' || request()->filled('problem_id'))
                            ->dehydrated()
                            ->live()
                            ->required(),
                        TextInput::make('version')
                            ->default(function (Get $get) {
                                $problemId = $get('problem_id') ?? request()->query('problem_id');

                                if (! $problemId) {
                                    return '1.0';
                                }

                                $latestVersion = \App\Models\ProblemVersion::where('problem_id', $problemId)
                                    ->orderBy('id', 'desc')
                                    ->first();

                                if (! $latestVersion) {
                                    return '1.0';
                                }

                                return number_format((float) $latestVersion->version + 0.1, 1, '.', '');
                            })
                            ->disabled()
                            ->dehydrated()
                            ->required(),
                        TextInput::make('prompt')
                            ->required(),
                        TextInput::make('constraints')
                            ->required(),
                        TextInput::make('official_solution')
                            ->required(),
                    ]),

                Section::make('Test Cases')
                    ->description('Define the inputs and expected outputs for the code evaluation.')
                    ->schema([
                        Repeater::make('test_cases')
                            ->itemLabel(fn (array $state): ?string => $state['explanation'] ?? 'Test Case')
                            ->columns(2)
                            ->schema([
                                Textarea::make('input')
                                    ->label('Standard Input (stdin)')
                                    ->rows(3)
                                    ->required(),
                                Textarea::make('expected_output')
                                    ->label('Expected Output (stdout)')
                                    ->rows(3)
                                    ->required(),
                                TextInput::make('explanation')
                                    ->placeholder('e.g. Edge case for zero values')
                                    ->columnSpan(1),
                                Toggle::make('is_public')
                                    ->label('Visible to Students (Sample)')
                                    ->default(false)
                                    ->columnSpan(1),
                            ])
                            ->collapsible()
                            ->cloneable(),
                    ]),

                Textarea::make('sample_output_input')
                    ->label('Sample Output/Input (Manual override)')
                    ->helperText('Usually derived from public test cases, but can be customized here.')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
