<?php

namespace App\Filament\Resources\LanguageTemplates\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
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

                        TextEntry::make('template')
                            ->label('Code Template')
                            ->columnSpanFull()
                            ->formatStateUsing(fn (string $state): string => "```\n{$state}\n```")
                            ->html(),
                    ]),
            ]);
    }
}
