<?php

namespace App\Filament\Resources\ProblemVersions\Pages;

use App\Filament\Resources\ProblemVersions\ProblemVersionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProblemVersions extends ListRecords
{
    protected static string $resource = ProblemVersionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
