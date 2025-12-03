<?php

namespace App\Services\OAuth;

use App\Services\OAuth\Contracts\OAuthProviderInterface;
use App\Services\OAuth\Providers\GoogleOAuthProvider;
use App\Services\OAuth\Providers\MicrosoftOAuthProvider;
use InvalidArgumentException;

class OAuthProviderFactory
{
    
    private const PROVIDERS = [
        'google' => GoogleOAuthProvider::class,
        'microsoft' => MicrosoftOAuthProvider::class,
    ];

    
    public static function create(string $providerName): OAuthProviderInterface
    {
        $providerName = strtolower($providerName);

        if (!isset(self::PROVIDERS[$providerName])) {
            throw new InvalidArgumentException(
                "Unsupported OAuth provider: {$providerName}. Supported providers: " . implode(', ', array_keys(self::PROVIDERS))
            );
        }

        $providerClass = self::PROVIDERS[$providerName];

        return new $providerClass();
    }

   
    public static function getSupportedProviders(): array
    {
        return array_keys(self::PROVIDERS);
    }
}

