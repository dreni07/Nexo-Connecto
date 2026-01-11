<?php

namespace App\Filament\Resources\Problems\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProblemInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Problem Information')
                    ->components([
                        TextEntry::make('problem_title'),
                        TextEntry::make('difficulty')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'easy' => 'success',
                                'medium' => 'warning',
                                'hard' => 'danger',
                                default => 'gray',
                            }),
                        TextEntry::make('status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'active' => 'success',
                                'archived' => 'gray',
                                'deprecated' => 'warning',
                                default => 'gray',
                            }),
                        TextEntry::make('categories.category_name')
                            ->label('Categories')
                            ->badge()
                            ->color('info'),
                        TextEntry::make('description')
                            ->columnSpanFull(),
                    ])->columns(3),
            ]);
    }
}
