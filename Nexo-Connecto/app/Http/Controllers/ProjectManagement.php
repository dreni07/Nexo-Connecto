<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Services\ProjectManagementService;
use App\Models\Project;

class ProjectManagement extends Controller
{
    protected $projectService;

    public function __construct(ProjectManagementService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        return Inertia::render('StudentRole/ProjectManagement/pages/CreateProject');
    }

    public function show($id)
    {
        $project = Project::with(['projectDetail', 'projectVisual', 'user'])->findOrFail($id);

        return Inertia::render('StudentRole/ProjectManagement/pages/ProjectPreview', [
            'project' => $project
        ]);
    }

    public function createProject(Request $request)
    {
        $data = $request->all();
        
        if ($request->hasFile('images')) {
            $data['images'] = $request->file('images');
        }

        $this->projectService->createProject($data);

        return redirect()->route('student.dashboard')->with('success', 'Project created successfully!');
    }

    public function fetchGithubStack(Request $request)
    {
        $githubUrl = $request->input('github_url');
        
        if (!$githubUrl || !str_contains($githubUrl, 'github.com')) {
            return response()->json(['error' => 'Invalid GitHub URL'], 400);
        }

        $parts = explode('/', rtrim($githubUrl, '/'));
        $repo = end($parts);
        $owner = prev($parts);

        if (!$owner || !$repo) {
            return response()->json(['error' => 'Could not extract owner or repo'], 400);
        }

        $apiUrl = "https://api.github.com/repos/{$owner}/{$repo}/languages";

        $token = env('GITHUB_PERSONAL_ACCESS_TOKEN');

        $response = Http::withHeaders([
            'Authorization' => $token ? "Bearer {$token}" : null,
            'Accept' => 'application/vnd.github.v3+json',
        ])->get($apiUrl);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch from GitHub'], $response->status());
        }

        $data = $response->json();
        $totalBytes = array_sum($data);
        
        $stack = [];
        
        foreach ($data as $name => $bytes) {
            $percentage = $totalBytes > 0 ? round(($bytes / $totalBytes) * 100) : 0;
            
            if ($percentage > 0) {
                $stack[] = [
                    'name' => $name,
                    'bytes' => $bytes,
                    'percentage' => $percentage,
                ];
            }
        }

        usort($stack, fn($a, $b) => $b['bytes'] <=> $a['bytes']);

        return response()->json($stack);
    }
}
