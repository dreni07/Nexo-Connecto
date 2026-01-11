<?php

namespace App\Jobs;


use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Submission;

class ProcessProblemSubmission implements ShouldQueue
{
    use Queueable,InteractsWithQueue,Dispatchable,SerializesModels;

    protected $submission;

    /**
     * Create a new job instance.
     */
    public function __construct(Submission $submission)
    {
        //
        $this->submission = $submission;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }
}
