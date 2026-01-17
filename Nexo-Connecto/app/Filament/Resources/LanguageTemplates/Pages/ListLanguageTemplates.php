<?php

namespace App\Filament\Resources\LanguageTemplates\Pages;

use App\Filament\Resources\LanguageTemplates\LanguageTemplateResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLanguageTemplates extends ListRecords
{
    protected static string $resource = LanguageTemplateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
