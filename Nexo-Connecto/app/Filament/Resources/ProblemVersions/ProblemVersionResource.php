<?php

namespace App\Filament\Resources\ProblemVersions;

use App\Filament\Resources\ProblemVersions\Pages\CreateProblemVersion;
use App\Filament\Resources\ProblemVersions\Pages\EditProblemVersion;
use App\Filament\Resources\ProblemVersions\Pages\ListProblemVersions;
use App\Filament\Resources\ProblemVersions\Pages\ViewProblemVersion;
use App\Filament\Resources\ProblemVersions\Schemas\ProblemVersionForm;
use App\Filament\Resources\ProblemVersions\Schemas\ProblemVersionInfolist;
use App\Filament\Resources\ProblemVersions\Tables\ProblemVersionsTable;
use App\Models\ProblemVersion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProblemVersionResource extends Resource
{
    protected static ?string $model = ProblemVersion::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'ProblemVersion';

    public static function form(Schema $schema): Schema
    {
        return ProblemVersionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ProblemVersionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProblemVersionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProblemVersions::route('/'),
            'create' => CreateProblemVersion::route('/create'),
            'view' => ViewProblemVersion::route('/{record}'),
            'edit' => EditProblemVersion::route('/{record}/edit'),
        ];
    }
}
