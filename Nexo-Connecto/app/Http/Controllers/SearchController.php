<?php

namespace App\Http\Controllers;

use App\Services\SearchService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    protected $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }


    public function __invoke(Request $request): JsonResponse
    {
        $query = $request->input('query', '');
        $type = $request->input('type', 'student');

        $results = $this->searchService->search($query, $type);

        return response()->json([
            'results' => $results
        ]);
    }
}




