<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable, TwoFactorAuthenticatable;
   
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
        'microsoft_id',
        'has_seen_coins_intro'
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
}
