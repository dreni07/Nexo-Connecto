<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Filament\Panel;
use Filament\Models\Contracts\FilamentUser;

class User extends Authenticatable implements FilamentUser
{
    
    use HasFactory, Notifiable, TwoFactorAuthenticatable;
   
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
        'microsoft_id',
        'has_seen_coins_intro',
        'is_admin'
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'has_seen_coins_intro' => 'boolean',
        ];
    }

    public function profile()
    {
        return $this->hasOne(Profile::class)->latestOfMany();
    }

    public function coins()
    {
        return $this->hasMany(User_Coin::class);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return (bool) $this->is_admin;
    }
}
