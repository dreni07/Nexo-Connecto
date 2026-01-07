<?php

namespace App\Services;

use App\Models\User;
use App\Models\TechnicalSkill;
use App\Models\Industry;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use App\Models\FAQ;

class Profile
{
  
    public function resolveProfileUser(?string $hashedId): array
    {
        $authUser = Auth::user();
        
        if (!$hashedId) {
            $authUser->loadMissing(['profile.studentProfile.specificMajor.university']);
            return [$authUser, true];
        }

        try {
            $decodedId = base64_decode($hashedId);
            
            if ($decodedId == $authUser->id) {
                $authUser->loadMissing(['profile.studentProfile.specificMajor.university']);
                return [$authUser, true];
            }

            $targetUser = User::with(['profile.studentProfile.specificMajor.university'])->find($decodedId);
            
            if ($targetUser) {
                return [$targetUser, false];
            }
        } catch (\Exception $e) {
            // Silently fall back to auth user if decoding fails
        }

        $authUser->loadMissing(['profile.studentProfile.specificMajor.university']);
        return [$authUser, true];
    }

   
    public function getUserSkills(User $user): array
    {
        $skills = [];
        $industry = null;
        
        if ($user->profile && $user->profile->studentProfile) {
            $skillIds = $user->profile->studentProfile->technical_skills ?? [];
            
            if (!empty($skillIds)) {

                $skillsData = TechnicalSkill::with('industry')
                    ->whereIn('id', $skillIds)
                    ->get();
                
                $skills = $skillsData->map(fn($s) => [
                    'id' => $s->id,
                    'skill_name' => $s->skill_name
                ])->toArray();

                if ($skillsData->isNotEmpty()) {
                    $firstSkill = $skillsData->first();
                    // veq e marrim industrin e first skill qe e kem sepse
                    // te gjith skills qe i kem duhet veqse me pas industrine e njojt
                    $industryModel = $firstSkill->industry()->first();
                    if ($industryModel) {
                        $industry = [
                            'id' => $industryModel->id, 
                            'name' => $industryModel->industry_name
                        ];
                    }
                }
            }
        }
        return ['skills' => $skills, 'industry' => $industry];
    }

  
    public function updateAvatar(User $user, UploadedFile $file): string
    {
        $profile = $user->profile;
        if (!$profile) {
            throw new \Exception('Profile not found');
        }

        $path = $file->store('avatars', 'public');
        $profile->update(['avatar' => $path]);
        
        return $path;
    }

  
    public function getIndustries()
    {
        return Industry::all(['id', 'industry_name']);
    }

   
    public function getTechnicalSkillsByIndustry(int $industryId)
    {
        return TechnicalSkill::where('industry', $industryId)
            ->get(['id', 'skill_name']);
    }

 
    public function updateStudentSkills(User $user, array $skillIds): void
    {
        $user->loadMissing('profile.studentProfile');
        
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found. Please complete your profile first.');
        }

        $industryIds = TechnicalSkill::whereIn('id', $skillIds)
            ->pluck('industry')
            ->unique()
            ->values()
            ->toArray();

        $studentProfile->update([
            'technical_skills' => $skillIds,
            'industries_preferences' => $industryIds
        ]);
    }

   
    public function updateStudentGpa(User $user, float $gpa): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'gpa' => $gpa
        ]);
    }

    public function updateStudentLanguages(User $user, array $languages): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'languages' => $languages
        ]);
    }

    
    public function updateStudentWorkPreference(User $user, string $preference): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'work_preference' => $preference
        ]);
    }

    
    public function updateStudentSocialMedia(User $user, array $socialMedia): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'social_media' => $socialMedia
        ]);
    }

   
    public function updateStudentCareerGoals(User $user, string $goals): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'career_goals' => $goals
        ]);
    }

    public function getStudentQuizQuestions(): array
    {
        $faq = FAQ::first();
        return $faq ? $faq->company_questions : [];
    }

    public function updateStudentQuizAnswers(User $user, array $answers): void
    {
        $user->loadMissing('profile.studentProfile');
        $studentProfile = $user->profile?->studentProfile;

        if (!$studentProfile) {
            throw new \Exception('Student profile not found.');
        }

        $studentProfile->update([
            'student_answers' => $answers
        ]);
    }
}

