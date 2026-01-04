<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailNotVerified
{
    /**
     * Handle an incoming request.
     *
     * Ensures that the user can only access the verification page
     * if their email is not yet verified (email_verified_at is null).
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // If user is not authenticated, let auth middleware handle it
        if (!$user) {
            return $next($request);
        }

        // If email is already verified, redirect to dashboard
        if ($user->email_verified_at !== null) {
            return redirect()->route('company.dashboard');
        }

        return $next($request);
    }
}

