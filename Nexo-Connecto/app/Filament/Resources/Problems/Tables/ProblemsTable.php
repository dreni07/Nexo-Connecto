<?php

namespace App\Filament\Resources\Problems\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\EditAction;
use Filament\Actions\LinkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;


class ProblemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->sortable(),

                TextColumn::make('problem_title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('difficulty')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'easy' => 'success',
                        'medium' => 'warning',
                        'hard' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'archived' => 'gray',
                        'deprecated' => 'warning',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('categories.category_name')
                    ->label('Categories')
                    ->badge()
                    ->searchable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
            ])
            ->actions([
                Action::make('createProblemVersion')
                    ->label('Create Version')
                    ->icon('heroicon-o-plus-circle')
                    ->color('info')
                    ->url(fn ($record) => \App\Filament\Resources\ProblemVersions\ProblemVersionResource::getUrl('create', ['problem_id' => $record->id])),

                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                // BulkActionGroup::make([
                //     DeleteBulkAction::make(),
                // ]),
            ]);
    }
}
