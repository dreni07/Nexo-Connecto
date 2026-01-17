<?php

namespace App\Filament\Resources\LanguageTemplates\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\CodeEntry;
use Filament\Schemas\Schema;

class LanguageTemplateInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Language Template Details')
                    ->components([
                        TextEntry::make('language.language_name')
                            ->label('Language'),

                        CodeEntry::make('template')
                            ->label('Code Template')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
