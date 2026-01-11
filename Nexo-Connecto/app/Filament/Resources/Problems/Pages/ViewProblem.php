<?php

namespace App\Filament\Resources\Problems\Pages;

use App\Filament\Resources\Problems\ProblemResource;
use App\Filament\Resources\ProblemVersions\ProblemVersionResource;
use App\Models\Problem;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Resources\Pages\ViewRecord;

class ViewProblem extends ViewRecord
{
    protected static string $resource = ProblemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            Action::make('createProblemVersion')
                ->label('Create Problem Version')
                ->icon('heroicon-o-plus-circle')
                ->color('info')
                ->url(fn (Problem $record): string => ProblemVersionResource::getUrl('create', ['problem_id' => $record->id])),
        ];
    }
}
