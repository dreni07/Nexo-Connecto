<?php

namespace App\Filament\Resources\ProblemVersions\Pages;

use App\Filament\Resources\ProblemVersions\ProblemVersionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditProblemVersion extends EditRecord
{
    protected static string $resource = ProblemVersionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
