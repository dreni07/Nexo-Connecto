<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .code-container {
            background-color: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        .verification-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #007bff;
            font-family: 'Courier New', monospace;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 14px;
            color: #6c757d;
            text-align: center;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #333; margin: 0;">Email Verification</h1>
        </div>
        
        <p>Hello,</p>
        
        <p>Thank you for registering! Please use the verification code below to verify your email address:</p>
        
        <div class="code-container">
            <div class="verification-code">{{ $code }}</div>
        </div>
        
        <div class="warning">
            <strong>⚠️ Important:</strong> This code will expire in 15 minutes. Do not share this code with anyone.
        </div>
        
        <p>If you didn't request this verification code, please ignore this email.</p>
        
        <div class="footer">
            <p style="margin: 0;">This is an automated message, please do not reply.</p>
            <p style="margin: 5px 0 0 0;">© {{ date('Y') }} {{ config('app.name', 'Nexo-Connecto') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

