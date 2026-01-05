<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Helpers\CoursePdfHelper;
use App\Services\CourseService;

class SavePdfContentToDb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:save-pdf-content-to-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Load the helper using require
        $helperPath = app_path('Helpers/CoursePdfHelper.php');
        require $helperPath;
        
        // Get PDF data from helper (using the class method)
        $pdfData = CoursePdfHelper::getPdfData();
        
        // Get API key from environment
        $apiKey = env('GROQ_API_KEY');
        
        if (!$apiKey) {
            $this->error("GROQ_API_KEY not found in .env file");
            return 1;
        }
        
        $totalCount = count($pdfData);
        
        if ($totalCount === 0) {
            $this->error("No PDFs found in the helper.");
            return 1;
        }
        
        $this->info("Processing {$totalCount} PDFs...");
        $this->line("");
        
        $courseService = new CourseService();
        $successCount = 0;
        $errorCount = 0;
        
        // Loop through all PDFs
        for ($i = 0; $i < $totalCount; $i++) {
            $pdfItem = $pdfData[$i];
            $pdfPath = $pdfItem['pdf_path'];
            $majorId = $pdfItem['major_id'];
            $pages = $pdfItem['pages'] ?? null; // Get pages if specified, otherwise null (all pages)
            
            $pageInfo = $pages ? " (Pages: " . implode(', ', $pages) . ")" : " (All pages)";
            $this->info("Processing PDF " . ($i + 1) . "/{$totalCount}: {$pdfPath} (Major ID: {$majorId}){$pageInfo}");
            
            try {
                // Extract content using the helper method (with optional pages parameter)
                $content = CoursePdfHelper::extractPdfContent($pdfPath, $pages);
                
                $this->info("PDF content extracted successfully!");
                $this->info("Sending extracted content to GROQ API...");
                
                // Prepare the prompt for the API
                $prompt = "Extract ONLY the SUBJECTS for each year from the following course content. 
            
Return the response ONLY in this JSON format (no additional text or explanation):
{
    \"year 1\": [\"Subject 1\", \"Subject 2\", \"Subject 3\"],
    \"year 2\": [\"Subject 1\", \"Subject 2\", \"Subject 3\"],
    \"year 3\": [\"Subject 1\", \"Subject 2\", \"Subject 3\"]
}

If there are more years (year 4, year 5, etc.), include them in the same format.

Course content:
{$content}";
                
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ])->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => 'openai/gpt-oss-20b',
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'temperature' => 0.3,
                ]);
                
                if (!$response->successful()) {
                    throw new \Exception("GROQ API request failed: " . $response->body());
                }
                
                $responseData = $response->json();
                
                // Extract the content from the response
                $extractedSubjects = $responseData['choices'][0]['message']['content'] ?? null;
                
                if (!$extractedSubjects) {
                    throw new \Exception("No content received from GROQ API");
                }
                
                // Log the result to console
                $this->info("Subjects extracted successfully!");
                $this->line("----------------------------------------");
                $this->line("Extracted Subjects:");
                $this->line($extractedSubjects);
                $this->line("----------------------------------------");
                
                // Save to database using CourseService
                $this->info("Saving course subjects to database...");
                $course = $courseService->saveCourseSubjects($majorId, $extractedSubjects);
                
                $this->info("✓ Course subjects saved successfully! (Course ID: {$course->id}, Major ID: {$course->major_id})");
                $successCount++;
                
            } catch (\Exception $e) {
                $this->error("✗ Error processing PDF {$pdfPath}: " . $e->getMessage());
                $errorCount++;
            }
            
            $this->line("");
        }
        
        $this->info("========================================");
        $this->info("Processing Complete!");
        $this->info("Successfully processed: {$successCount}");
        $this->info("Errors: {$errorCount}");
        $this->info("========================================");
        
        return $errorCount > 0 ? 1 : 0;
    }
}
