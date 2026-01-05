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

        $hasProfile = Profile::where('user_id', $user->id)->exists();

        if (!$hasProfile) {
            $userRole = UserRole::fromId($user->role);

            if ($userRole === UserRole::Student) {
                return redirect()->route('student.profile.index');
            } elseif ($userRole === UserRole::Company) {
                return redirect()->route('company.profile.create');
            }
        }

        return $next($request);
    }
}

