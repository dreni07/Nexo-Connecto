<?php 

namespace App\Services;

use App\Models\User;
use App\Mail\VerificationCodeMail;
use Illuminate\Support\Facades\Mail;
use Exception;

class EmailService 
{
    public function sendVerificationCode(int $userId, int $code): bool
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                throw new Exception("User not found");
            }

            if (!$user->email) {
                throw new Exception("User email is missing");
            }

            // send the verification code to the user's email
            Mail::to($user->email)->send(new VerificationCodeMail($code));

            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}