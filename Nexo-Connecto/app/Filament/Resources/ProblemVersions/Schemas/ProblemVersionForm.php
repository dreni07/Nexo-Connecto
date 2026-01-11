<?php

namespace App\Filament\Resources\ProblemVersions\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ProblemVersionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('problem_id')
                    ->relationship('problem', 'problem_title')
                    ->default(request()->query('problem_id'))
                    ->disabled(fn () => request()->has('problem_id'))
                    ->dehydrated()
                    ->required(),
                TextInput::make('version')
                    ->required(),
                TextInput::make('prompt')
                    ->required(),
                TextInput::make('constraints')
                    ->required(),
                Textarea::make('test_cases')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('sample_output_input')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('official_solution')
                    ->required(),
                TextInput::make('checksum')
                    ->required(),
            ]);
    }
}
