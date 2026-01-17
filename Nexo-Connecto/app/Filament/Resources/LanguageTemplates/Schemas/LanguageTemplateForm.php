<?php

namespace App\Filament\Resources\LanguageTemplates\Schemas;

use App\Models\Language;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\CodeEditor;
use Filament\Forms\Components\CodeEditor\Enums\Language as CodeLanguage;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class LanguageTemplateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Language Template Details')
                    ->schema([
                        Select::make('language_id')
                            ->label('Language')
                            ->options(function ($record) {
                                return Language::query()
                                    ->when($record, function ($query, $record) {
                                        // If editing, allow the current language to be selected
                                        $query->whereDoesntHave('template', function ($q) use ($record) {
                                            $q->where('id', '!=', $record->id);
                                        });
                                    }, function ($query) {
                                        // If creating, only show languages without templates
                                        $query->whereDoesntHave('template');
                                    })
                                    ->pluck('language_name', 'id');
                            })
                            ->required()
                            ->searchable()
                            ->preload()
                            ->live()
                            ->unique(ignoreRecord: true),

                        CodeEditor::make('template')
                            ->label('Code Template')
                            ->required()
                            ->columnSpanFull()
                            ->language(function (Get $get) {
                                $languageId = $get('language_id');
                                if (! $languageId) {
                                    return null;
                                }

                                $language = Language::find($languageId);
                                if (! $language) {
                                    return null;
                                }

                                return match (strtolower($language->language_name)) {
                                    'javascript', 'js' => CodeLanguage::JavaScript,
                                    'python', 'py' => CodeLanguage::Python,
                                    'java' => CodeLanguage::Java,
                                    'c++', 'cpp' => CodeLanguage::Cpp,
                                    'php' => CodeLanguage::Php,
                                    'html' => CodeLanguage::Html,
                                    'css' => CodeLanguage::Css,
                                    'sql' => CodeLanguage::Sql,
                                    'json' => CodeLanguage::Json,
                                    'xml' => CodeLanguage::Xml,
                                    'yaml', 'yml' => CodeLanguage::Yaml,
                                    'go' => CodeLanguage::Go,
                                    'markdown', 'md' => CodeLanguage::Markdown,
                                    default => null,
                                };
                            })
                            ->helperText('The default code structure provided to students when they start a problem in this language.'),
                    ]),
            ]);
    }
}
