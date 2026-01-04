<?php

namespace App\Services;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Exception;

class RegisterService 
{
    private function checkIfEmailExists(string $email) 
    {
        return User::where('email',$email)->exists();
    }
    public function register(string $username,string $email,string $password,int $role)
    {
        try {
            if ($this->checkIfEmailExists($email)) {
                return [
                    'success' => false,
                    'message' => 'Email Alredy Exists'
                ];
            }

            $new_user = User::create([
                'name' => $username,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => $role
            ]);

            return [
                'success' => true,
                'message' => 'Account Created Successfully',
                'user' => $new_user
            ];
            
        } catch (Exception $err) {
            throw $err;
        }
    }
}