<?php

namespace App\Filament\Resources\Problems\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;

class ProblemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Problem Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('problem_title')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('description')
                            ->required()
                            ->maxLength(255),

                        Select::make('difficulty')
                            ->options([
                                'easy' => 'Easy',
                                'medium' => 'Medium',
                                'hard' => 'Hard',
                            ])
                            ->required(),

                        Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'archived' => 'Archived',
                                'deprecated' => 'Deprecated',
                            ])
                            ->required()
                            ->default('active'),

                        Select::make('categories')
                            ->relationship(
                                name: 'categories',
                                titleAttribute: 'category_name',
                                modifyQueryUsing: fn ($query) => $query->where('is_active', true),
                            )
                            ->multiple()
                            ->preload()
                            ->required(),
                    ]),
            ]);
    }
}
