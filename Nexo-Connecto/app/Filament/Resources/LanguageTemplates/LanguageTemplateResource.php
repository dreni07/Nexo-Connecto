<?php

namespace App\Filament\Resources\LanguageTemplates;

use App\Filament\Resources\LanguageTemplates\Pages\CreateLanguageTemplate;
use App\Filament\Resources\LanguageTemplates\Pages\EditLanguageTemplate;
use App\Filament\Resources\LanguageTemplates\Pages\ListLanguageTemplates;
use App\Filament\Resources\LanguageTemplates\Pages\ViewLanguageTemplate;
use App\Filament\Resources\LanguageTemplates\Schemas\LanguageTemplateForm;
use App\Filament\Resources\LanguageTemplates\Schemas\LanguageTemplateInfolist;
use App\Filament\Resources\LanguageTemplates\Tables\LanguageTemplatesTable;
use App\Models\ProblemTemplate;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LanguageTemplateResource extends Resource
{
    protected static ?string $model = ProblemTemplate::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Language Templates';

    protected static ?string $modelLabel = 'Language Template';

    protected static ?string $pluralModelLabel = 'Language Templates';

    protected static ?string $recordTitleAttribute = 'template';

    public static function form(Schema $schema): Schema
    {
        return LanguageTemplateForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LanguageTemplateInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LanguageTemplatesTable::configure($table);
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
            'index' => ListLanguageTemplates::route('/'),
            'create' => CreateLanguageTemplate::route('/create'),
            'view' => ViewLanguageTemplate::route('/{record}'),
            'edit' => EditLanguageTemplate::route('/{record}/edit'),
        ];
    }
}
