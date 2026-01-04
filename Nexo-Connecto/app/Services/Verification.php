<?php 

namespace App\Services;
use Illuminate\Support\Str;
use App\Models\VerificationCode;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;


class Verification 
{
    public function __construct(
        private EmailService $emailService
    ) {
    }
    public function generateCode():int 
    {
        $code = random_int(100000, 999999);
        return $code;
    }

    public function getTheCode(int $userId):VerificationCode | bool
    {
        $the_verification_code = VerificationCode::where('user_id',$userId)->where('expires_at','>',now())->first();

        if (!$the_verification_code)
        {
            return false;
        }

        return $the_verification_code;
    }

    public function generateAndStore(int $userId):int
    {
        $code = $this->generateCode();
        $this->storeCode($userId, $code);
        
     
        // we are saving the code in cache if the user requests the code again within 15 minutes
        Cache::put("verification_code_plain_{$userId}", $code, now()->addMinutes(15));
        
        return $code;
    }

    public function handleRequest(int $userId): array
    {
        try {
            $code = null;

            $the_code = $this->getTheCode($userId);

            if ($the_code) {
                $code = Cache::get("verification_code_plain_{$userId}");
                
                if (!$code) {
                    $code = $this->generateAndStore($userId);
                }
            } else {
                $code = $this->generateAndStore($userId);               
            }
          
            $this->emailService->sendVerificationCode($userId, $code);
            
            return [
                'success' => true,
                'message' => 'Verification code sent successfully.',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to send verification code. Please try again.',
            ];
        }
    }
    // metod qe ka mu perdore per me store codin per here te pare ose me update kur te bon expire 
    public function storeCode (int $userId,int $code):VerificationCode 
    {
        $the_code_stored = VerificationCode::updateOrCreate(
            [
                'user_id' => $userId,
            ],
            [
                'code' => Hash::make((string) $code),
                'expires_at' => now()->addMinutes(15),
                'used_at' => null,
            ]
        );

        return $the_code_stored;
    }

    public function updateEmailVerification(int $userId):void 
    {
        $user = User::find($userId);

        $user->email_verified_at = now();

        $user->save();

    }

    public function verifyCode(int $userId,int $code):array
    {

        $error_message = null;

        $the_verification_code = VerificationCode::where('user_id',$userId)->where('expires_at','>',now())->first();

        if (!$the_verification_code) {
            $error_message = 'Invalid or expired verification code.';

            return [
                'success' => false,
                'message' => $error_message,
            ];
        }

        if (!Hash::check($code, (string)$the_verification_code->code)) {
            $error_message = 'Invalid verification code.';

            return [
                'success' => false,
                'message' => $error_message,
            ];
        }

        $the_verification_code->update([
            'used_at' => now()
        ]);

        // Clear the cached plain code after successful verification
        Cache::forget("verification_code_plain_{$userId}");

        $this->updateEmailVerification($userId);
        
        return [
            'success' => true,
            'message' => 'Email verified successfully.',
        ];
    }
}