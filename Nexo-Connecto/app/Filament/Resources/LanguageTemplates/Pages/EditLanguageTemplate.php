<?php

namespace App\Filament\Resources\LanguageTemplates\Pages;

use App\Filament\Resources\LanguageTemplates\LanguageTemplateResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLanguageTemplate extends EditRecord
{
    protected static string $resource = LanguageTemplateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
