<?php

namespace App\Filament\Resources\ProblemVersions\Pages;

use App\Filament\Resources\ProblemVersions\ProblemVersionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewProblemVersion extends ViewRecord
{
    protected static string $resource = ProblemVersionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
