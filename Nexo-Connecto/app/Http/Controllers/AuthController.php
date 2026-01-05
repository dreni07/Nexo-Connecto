<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RegisterService;
use App\Services\AuthService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\User;
use App\Models\Profile;
use App\Enums\UserRole;


use Inertia\Inertia;

class AuthController extends Controller
{
    //
    private RegisterService $registerService;
    private AuthService $authService;

    public function __construct(AuthService $authService,RegisterService $registerService){
        $this->authService = $authService;
        $this->registerService = $registerService;
    }

    private function hasProfile(int $userId): bool
    {
        return Profile::where('user_id',$userId)->exists();
    }

    public function register(Request $request) 
    {
        $validated_data = Validator::make($request->all(),[
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required'
        ]);

        if ($validated_data->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validated_data->errors()
            ], 422);
        }

        $result = $this->registerService->register($request->username,
           $request->email,
           $request->password,
           $request->role
        );

        if ($result['success']) {
            
            $user = $result['user'];

            Auth::login($user);

            $hasProfile = $this->hasProfile($user->id);

            $userRole = UserRole::fromId($user->role);

            $result['hasProfile'] = $hasProfile;

            $result['user'] = [
                'id' => $user->id,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'role' => $userRole?->value ?? null,
            ];
        }
        
        return response()->json($result);

    }

    public function register_page(Request $request)
    {
        if (Auth::check()) {
            if ($request->user()->email_verified_at) {
                $userRole = UserRole::fromId($request->user()->role);
                
                if ($userRole === UserRole::Student) {
                    return redirect()->route('student.dashboard');
                } elseif ($userRole === UserRole::Company) {
                    return redirect()->route('company.dashboard');
                }
                
                return redirect()->route('company.dashboard');
            } else {
                return redirect()->route('verify');
            }
        }

        return Inertia::render('Authentication/Register');
    }

    public function login(Request $request)
    {
        $validated_data = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validated_data->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validated_data->errors()
            ], 422);
        }

        $result = $this->authService->login($request->email, $request->password);

        if ($result['success']) {
            $hasProfile = $this->hasProfile($result['user']['id']);
            
            $user = User::find($result['user']['id']);
            $userRole = $user ? UserRole::fromId($user->role) : null;

            $result['hasProfile'] = $hasProfile;
            $result['user']['role'] = $userRole?->value ?? null;
        }
        
        return response()->json($result);
    }

    public function login_page(Request $request)
    {
        if (Auth::check()) {
            if ($request->user()->email_verified_at) {
                $userRole = UserRole::fromId($request->user()->role);
                
                // Redirect to appropriate dashboard (middleware will handle profile check)
                if ($userRole === UserRole::Student) {
                    return redirect()->route('student.dashboard');
                } elseif ($userRole === UserRole::Company) {
                    return redirect()->route('company.dashboard');
                }
                
                return redirect()->route('company.dashboard');
            } else {
                return redirect()->route('verify');
            }
        }

        return Inertia::render('Authentication/SignIn');
    }
}
