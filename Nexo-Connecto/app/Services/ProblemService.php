<?php

namespace App\Services;

use App\Models\Problem;
use App\Models\ProblemCategory;
use App\Models\CompanyProfile;
use App\Models\ProblemVersion;
use App\Models\Language;
use App\Models\LanguageParameterMapping;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class ProblemService
{

    public function getActiveCategories(): Collection
    {
        return Cache::remember('active_categories', 3600, function () {
            return ProblemCategory::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get();
        });
    }

    
    public function getPaginatedProblems(int $perPage = 50, ?string $search = null, ?int $categoryId = null): LengthAwarePaginator
    {
        $page = request()->get('page', 1);
        $cacheKey = "problems_page_{$page}_search_" . ($search ?? 'none') . "_cat_" . ($categoryId ?? 'all');

        return Cache::remember($cacheKey, 300, function () use ($perPage, $search, $categoryId) {
            $query = Problem::with('categories')
                ->where('status', 'active');

            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('problem_title', 'like', "%{$search}%")
                      ->orWhere('id', 'like', "%{$search}%");
                });
            }

            if ($categoryId) {
                $query->whereHas('categories', function($q) use ($categoryId) {
                    $q->where('problem_categories.id', $categoryId);
                });
            }

            return $query->paginate($perPage)->withQueryString();
        });
    }

    
    public function getTrendingCompanies(int $limit = 10): Collection
    {
        return CompanyProfile::take($limit)
            ->get(['id', 'company_name', 'company_pictures']);
    }

    public function getProblemDetails(int $id): ProblemVersion
    {
        // find the problem
        $problem = Problem::findOrFail($id);

        // find the last version of the particular problem with problem relationship
        return $problem->versions()
            ->with('problem')
            ->orderBy('id', 'desc')
            ->firstOrFail();
    }

    public function getAvailableLanguages(?ProblemVersion $problemVersion = null): Collection
    {
        $languages = Language::with('template')->get();

        if ($problemVersion) {
            $languages->each(function ($language) use ($problemVersion) {
                if ($language->template) {
                    $language->processed_template = $this->processTemplate(
                        $language->template->template,
                        $problemVersion,
                        $language->language_name
                    );
                } else {
                    $language->processed_template = "";
                }
            });
        }

        return $languages;
    }

  
    private function processTemplate(string $template, ProblemVersion $problemVersion, string $languageName): string
    {
        $metadata = $problemVersion->constraints_structure ?? [];
        $functionName = $metadata['function_name'] ?? 'solution';
        $parameters = $metadata['parameters'] ?? [];

        // Fetch mapping for this language
        $mappingModel = LanguageParameterMapping::whereHas('language', function ($query) use ($languageName) {
            $query->where('language_name', $languageName);
        })->first();

        $typeMapping = $mappingModel ? $mappingModel->language_parameter_mapping : [];

        $paramNames = array_map(fn ($p) => $p['name'], $parameters);
        $args = implode(', ', $paramNames);

        $argsDocs = "";
        $isJsOrTs = in_array(strtolower($languageName), ['javascript', 'js', 'typescript', 'ts']);
        $isPhp = strtolower($languageName) === 'php';

        if ($isJsOrTs || $isPhp) {
            $docs = [];
            foreach ($parameters as $p) {
                $standardType = $p['type'] ?? 'any';
                $type = $typeMapping[$standardType] ?? $standardType;
                $name = $p['name'] ?? 'arg';
                $docs[] = " * @param {{$type}} {$name}";
            }
            $argsDocs = implode("\n", $docs);
        } else if (in_array(strtolower($languageName), ['python', 'py'])) {
            $docs = [];
            foreach ($parameters as $p) {
                $standardType = $p['type'] ?? 'any';
                $type = $typeMapping[$standardType] ?? $standardType;
                $name = $p['name'] ?? 'arg';
                $docs[] = "    :param {$name}: {$type}";
            }
            $argsDocs = implode("\n", $docs);
        }

        // Replace placeholders
        $processed = str_replace('{functionName}', $functionName, $template);
        $processed = str_replace('{args}', $args, $processed);
        $processed = str_replace('{args_docs}', $argsDocs, $processed);

        return $processed;
    }
}

