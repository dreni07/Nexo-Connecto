<?php 

    namespace App\Services;


    use App\Models\ProjectDetail;
    use App\Models\ProjectVisual;
    use App\Models\Project;
    use Illuminate\Http\UploadedFile;
    use Illuminate\Support\Facades\Storage;

    class ProjectManagementService
    {
        private function createProjectDetail(array $data)
        {
            $projectDetail = ProjectDetail::create([
                'project_title' => $data['title'],
                'project_summary' => $data['summary'],
                'project_tags' => $data['tags'],
                'project_difficulty' => $data['difficulty'],
                'project_status' => $data['status'],
                'project_answers' => $data['fixedQuestions'],
                'project_tech_stack' => $data['techStack'],
                'project_learning_answers' => $data['learningQuestions'],
            ]);

            return $projectDetail->id;
        }


        private function createProjectVisual(array $data)
        {
            $imagePaths = [];
            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    if ($image instanceof UploadedFile) {
                        $path = $image->store('project_images', 'public');
                        $imagePaths[] = $path;
                    }
                }
            }

            $projectVisual = ProjectVisual::create([
                'images' => $imagePaths,
                'live_demo' => $data['liveDemoUrl'] ?? null,
                'github_link' => $data['githubUrl'] ?? null,
            ]);

            return $projectVisual->id;
        }

        public function createProject(array $data)
        {
            $detailId = $this->createProjectDetail($data);
            $visualId = $this->createProjectVisual($data);

            return Project::create([
                'user_id' => auth()->id(),
                'project_detail_id' => $detailId,
                'project_visual_id' => $visualId,
            ]);
        }

        public function getAllProjectsForUser(int $userId)
        {
            $projects = Project::with(['projectDetail','projectVisual','user'])->where('user_id',$userId)->get();

            return $projects;
        }

        public function deleteProject(int $id)
        {
            $project = Project::with(['projectDetail', 'projectVisual'])->findOrFail($id);

            if ($project->projectVisual && !empty($project->projectVisual->images)) {
                foreach ($project->projectVisual->images as $imagePath) {
                    if (Storage::disk('public')->exists($imagePath)) {
                        Storage::disk('public')->delete($imagePath);
                    }
                }
            }

            if ($project->projectDetail) {
                $project->projectDetail->delete();
            }

            if ($project->projectVisual) {
                $project->projectVisual->delete();
            }

            $project->delete();

            return [
                'success' => true,
                'message' => 'Project deleted Successfully'
            ];
        }

        public function updateProject(int $id,array $data)
        {
            $project = Project::findOrFail($id);

            $project->projectDetail->update([
                'project_title' => $data['title'],
                'project_summary' => $data['summary'],
                'project_tags' => $data['tags'],
                'project_difficulty' => $data['difficulty'],
                'project_status' => $data['status'],
                'project_answers' => $data['fixedQuestions'],
                'project_tech_stack' => $data['techStack'],
                'project_learning_answers' => $data['learningQuestions'],
            ]);

            $project->projectVisual->update([
                'live_demo' => $data['liveDemoUrl'],
                'github_link' => $data['githubUrl'],
                'images' => $data['images'],
            ]);

            return [
                'success' => true,
                'message' => 'Project updated Successfully'
            ];
        }
    }