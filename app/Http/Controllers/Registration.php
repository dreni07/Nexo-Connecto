<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Registration extends Controller
{
    private function getCompanyRoleId(): int
    {
        $role = Role::where('role_name', 'company')->first();
        
        if (!$role) {
            throw new \Exception('Company role not found in database');
        }
        
        return $role->id;
    }

    private function generateRandomName(): string
    {
        return 'Company_' . Str::random(8);
    }

    public function create_account(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first() ?: 'Validation failed'
            ], 422);
        }

        try {
            $user = User::create([
                'name' => $this->generateRandomName(),
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $this->getCompanyRoleId(),
            ]);

            Auth::login($user);

            return response()->json([
                'success' => true,
                'message' => 'Account created successfully',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ]
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create account. Please try again.'
            ], 500);
        }
    }
}
