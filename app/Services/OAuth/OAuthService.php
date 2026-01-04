<?php

namespace App\Services\OAuth;

use App\Models\Role;
use App\Models\User;
use App\Services\OAuth\Contracts\OAuthProviderInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class OAuthService
{
    
    public function redirect(string $providerName)
    {
        $provider = OAuthProviderFactory::create($providerName);
        return $provider->redirect();
    }

   
    public function handleCallback(string $providerName, ?string $intendedRole = null): User
    {
        $provider = OAuthProviderFactory::create($providerName);
        $socialiteUser = $provider->user();

        $user = $this->findOrCreateUser($provider, $socialiteUser, $intendedRole);
        
        Auth::login($user);

        return $user;
    }

    
    private function findOrCreateUser(OAuthProviderInterface $provider, SocialiteUser $socialiteUser, ?string $intendedRole = null): User
    {
        $providerIdColumn = $provider->getProviderIdColumn();

        $user = User::where($providerIdColumn, $socialiteUser->getId())->first();

        if ($user) {
            return $user;
        }

        $user = User::where('email', $socialiteUser->getEmail())->first();

        if ($user) {
            $user->{$providerIdColumn} = $socialiteUser->getId();
            $user->save();
            return $user;
        }

        $roleId = $this->getRoleId($intendedRole);

        try {
            return User::create([
                'name' => $socialiteUser->getName(),
                'email' => $socialiteUser->getEmail(),
                $providerIdColumn => $socialiteUser->getId(),
                'role' => $roleId,
                'email_verified_at' => now(), 
                'password' => bcrypt(Str::random(16)), 
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

   
    private function getRoleId(?string $roleName): int
    {
        if (!$roleName) {
            $roleName = 'company';
        }

        $role = Role::where('role_name', $roleName)->first();

        if (!$role) {
            $role = Role::where('role_name', 'company')->first();
        }

        return $role ? $role->id : 2; 
    }
}

