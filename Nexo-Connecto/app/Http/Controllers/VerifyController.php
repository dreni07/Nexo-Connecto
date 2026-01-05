<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\Verification;
use App\Enums\UserRole;
use Inertia\Inertia;

class VerifyController extends Controller
{
    public function __construct(
        private Verification $verification
    ) {
    }

    public function verify(Request $request) 
    {
        return Inertia::render('Authentication/Verification/Verify',[
            'email' => $request->user()->email ?? 'drenllazani10@gmail.com'
        ]);
    }

    public function handleRequest(Request $request) 
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated.'
            ], 401);
        }

        $result = $this->verification->handleRequest($user->id);

        return response()->json($result);
    }

    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|numeric|digits:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first() ?: 'Validation failed'
            ], 422);
        }

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated.'
            ], 401);
        }

        $code = (int) $request->code;
        $result = $this->verification->verifyCode($user->id, $code);

        // Add user role to response (middleware will handle profile redirect)
        if ($result['success']) {
            $userRole = UserRole::fromId($user->role);
            
            $result['user'] = [
                'id' => $user->id,
                'role' => $userRole?->value ?? null,
            ];
        }

        return response()->json($result);
    }
}
