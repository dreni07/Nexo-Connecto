<?php

namespace App\Services\OAuth\Contracts;

use Laravel\Socialite\Contracts\User as SocialiteUser;

interface OAuthProviderInterface
{
    /**
     * Get the provider name 
     */
    public function getProviderName(): string;

    /**
     * Get the database column name for storing the provider ID.
     */
    public function getProviderIdColumn(): string;

    /**
     * Redirect the user to the OAuth provider.
     */
    public function redirect();

    /**
     * Get the user from the OAuth provider callback.
     */
    public function user(): SocialiteUser;
}

