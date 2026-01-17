<?php

namespace App\Filament\Resources\LanguageTemplates\Pages;

use App\Filament\Resources\LanguageTemplates\LanguageTemplateResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLanguageTemplate extends ViewRecord
{
    protected static string $resource = LanguageTemplateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
