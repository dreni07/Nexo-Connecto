<?php

namespace App\Services;

use App\Models\Problem;
use App\Models\ProblemCategory;
use App\Models\CompanyProfile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProblemService
{

    public function getActiveCategories(): Collection
    {
        return ProblemCategory::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();
    }

    
    public function getPaginatedProblems(int $perPage = 50): LengthAwarePaginator
    {
        return Problem::with('categories')
            ->where('status', 'active')
            ->paginate($perPage);
    }

    
    public function getTrendingCompanies(int $limit = 10): Collection
    {
        return CompanyProfile::take($limit)
            ->get(['id', 'company_name', 'company_pictures']);
    }
}

