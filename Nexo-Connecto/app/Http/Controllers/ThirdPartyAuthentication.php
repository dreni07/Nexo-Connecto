<?php

namespace App\Http\Controllers;

use App\Services\OAuth\OAuthService;
use Illuminate\Http\Request;

class ThirdPartyAuthentication extends Controller
{
    public function __construct(
        private OAuthService $oauthService
    ) {}

   
    public function redirect(Request $request, string $provider)
    {
        try {
            // Determine role from referrer URL (safer than using current URL)
            $referrer = $request->headers->get('referer') ?? '';
            $intendedRole = $this->determineRoleFromUrl($referrer);
            
            // Store the intended role in session before OAuth redirect
            if ($intendedRole) {
                session(['oauth_intended_role' => $intendedRole]);
            }
            
            return $this->oauthService->redirect($provider);
        } catch (\InvalidArgumentException $e) {
            return redirect()->route('company.onboarding')
                ->with('error', 'Unsupported authentication provider.');
        } catch (\Exception $e) {
            return redirect()->route('company.onboarding')
                ->with('error', 'Failed to initiate authentication. Please try again.');
        }
    }

 
    public function callback(string $provider)
    {
        try {
            // Get the intended role from session
            $intendedRole = session('oauth_intended_role');
            
            $this->oauthService->handleCallback($provider, $intendedRole);
            
            // Clear the session variable after use
            session()->forget('oauth_intended_role');
            
            return redirect()->intended('/dashboard');
        } catch (\InvalidArgumentException $e) {
            return redirect()->route('company.onboarding')
                ->with('error', 'Unsupported authentication provider.');
        } catch (\Exception $e) {
            session()->forget('oauth_intended_role');
            return redirect()->route('company.onboarding')
                ->with('error', 'Failed to authenticate. Please try again.');
        }
    }

   
    private function determineRoleFromUrl(string $url): ?string
    {
        if (str_contains($url, '/company')) {
            return 'company';
        }
        
        if (str_contains($url, '/student')) {
            return 'student';
        }
        
        return null;
    }
}
