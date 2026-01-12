<?php

namespace App\Services;

use App\Models\Problem;
use App\Models\ProblemCategory;
use App\Models\CompanyProfile;
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
}

