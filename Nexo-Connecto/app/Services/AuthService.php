<?php 

    namespace App\Services;

    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use App\Models\User;

    class AuthService 
    {
        public function login(string $email, string $password): array
        {
            $user = User::where('email', $email)->first();

            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'Invalid email or password.',
                ];
            }

            if (!Hash::check($password, $user->password)) {
                return [
                    'success' => false,
                    'message' => 'Invalid email or password.',
                ];
            }

            Auth::login($user);

            return [
                'success' => true,
                'message' => 'Signed in successfully.',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                ],
            ];
        }
    }