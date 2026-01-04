<?php

namespace App\Services\OAuth\Providers;

use App\Services\OAuth\Contracts\OAuthProviderInterface;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class GoogleOAuthProvider implements OAuthProviderInterface
{
    public function getProviderName(): string
    {
        return 'google';
    }

    public function getProviderIdColumn(): string
    {
        return 'google_id';
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function user(): SocialiteUser
    {
        return Socialite::driver('google')->user();
    }
}

