<?php

namespace App\Services\OAuth\Providers;

use App\Services\OAuth\Contracts\OAuthProviderInterface;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class MicrosoftOAuthProvider implements OAuthProviderInterface
{
    public function getProviderName(): string
    {
        return 'microsoft';
    }

    public function getProviderIdColumn(): string
    {
        return 'microsoft_id';
    }

    public function redirect()
    {
        return Socialite::driver('microsoft')->redirect();
    }

    public function user(): SocialiteUser
    {
        return Socialite::driver('microsoft')->user();
    }
}

