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

    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryId = $request->input('category_id');

        return Inertia::render('StudentRole/Problems/pages/Index', [
            'categories' => $this->problemService->getActiveCategories(),
            'problems' => $this->problemService->getPaginatedProblems(50, $search, $categoryId),
            'trendingCompanies' => $this->problemService->getTrendingCompanies(10),
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId
            ]
        ]);
    }

    public function show(Request $request,int $id)
    {
        $problemDetails = $this->problemService->getProblemDetails($id);
        
        return Inertia::render('StudentRole/Problems/pages/ProblemDetails', [
            'problem_details' => $problemDetails,
            'available_languages' => $this->problemService->getAvailableLanguages($problemDetails)
        ]);
    }
}
