<?php

namespace App\Services;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class SearchService
{
    
    public function search(string $query, string $type): Collection
    {
        if (!$query) {
            return collect();
        }

        $userQuery = User::query()
            ->where(function (Builder $q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%");
            });
            
        if ($type === 'student') {
            return $this->searchStudents($userQuery);
        } elseif ($type === 'company') {
            return $this->searchCompanies($userQuery);
        }

        return collect();
    }

    protected function searchStudents(Builder $userQuery): Collection
    {
        $studentRoleId = UserRole::Student->getId();

        return $userQuery->where('role', $studentRoleId)
            ->with(['profile.studentProfile.specificMajor.university'])
            ->get()
            ->map(function ($user) {
                $university = $user->profile?->studentProfile?->specificMajor?->university?->university_name ?? 'N/A';
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->profile?->avatar,
                    'sub_text' => $university,
                    'type' => 'student'
                ];
            });
    }

    protected function searchCompanies(Builder $userQuery): Collection
    {
        $companyRoleId = UserRole::Company->getId();

        return $userQuery->where('role', $companyRoleId)
            ->with(['profile.companyProfile'])
            ->get()
            ->map(function ($user) {
                $companyName = $user->profile?->companyProfile?->company_name ?? 'N/A';
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->profile?->avatar,
                    'sub_text' => $companyName,
                    'type' => 'company'
                ];
            });
    }
}
