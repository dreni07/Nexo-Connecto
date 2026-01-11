<?php

namespace App\Http\Controllers;

use App\Services\ProblemService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProblemController extends Controller
{
    protected $problemService;

    public function __construct(ProblemService $problemService)
    {
        $this->problemService = $problemService;
    }

    public function index()
    {
        return Inertia::render('StudentRole/Problems/pages/Index', [
            'categories' => $this->problemService->getActiveCategories(),
            'problems' => $this->problemService->getPaginatedProblems(50),
            'trendingCompanies' => $this->problemService->getTrendingCompanies(10)
        ]);
    }
}
