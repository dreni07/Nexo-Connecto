<?php

namespace App\Filament\Resources\ProblemVersions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProblemVersionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('problem.id')
                    ->label('Problem'),
                TextEntry::make('version'),
                TextEntry::make('prompt'),
                TextEntry::make('constraints'),
                TextEntry::make('test_cases')
                    ->columnSpanFull(),
                TextEntry::make('sample_output_input')
                    ->columnSpanFull(),
                TextEntry::make('official_solution'),
                TextEntry::make('checksum'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
