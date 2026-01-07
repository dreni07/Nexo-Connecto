<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use App\Enums\UserRole;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileExists
{
    
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return $next($request);
        }

        $user = $request->user();
        
        $currentPath = $request->path();
        if (str_contains($currentPath, 'create-profile')) {
            return $next($request);
        }

        $profile = Profile::where('user_id', $user->id)->latest()->first();

        if (!$profile) {
            return $this->redirectToCreateProfile($user->role);
        }

        // Check for role-specific profile record
        $userRole = UserRole::fromId($user->role);
        if ($userRole === UserRole::Student && !$profile->studentProfile()->exists()) {
            return $this->redirectToCreateProfile($user->role);
        } elseif ($userRole === UserRole::Company && !$profile->companyProfile()->exists()) {
            return $this->redirectToCreateProfile($user->role);
        }

        return $next($request);
    }

    private function redirectToCreateProfile(int $roleId): Response
    {
        $userRole = UserRole::fromId($roleId);
        if ($userRole === UserRole::Student) {
            return redirect()->route('student.profile.index');
        } elseif ($userRole === UserRole::Company) {
            return redirect()->route('company.profile.create');
        }
        return redirect('/');
    }
}

