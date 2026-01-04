<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class EnsureStudentRole
{
    /**
     * Handle an incoming request.
     *
     * Ensures that the authenticated user has the 'student' role.
     * If not, the request will be aborted with a 403 Forbidden response.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            abort(401, 'Unauthenticated.');
        }

        $user = $request->user();
        $role = Role::find($user->role);

        if (!$role || $role->role_name !== 'student') {
            abort(403, 'Access denied. Student role required.');
        }

        return $next($request);
    }
}

