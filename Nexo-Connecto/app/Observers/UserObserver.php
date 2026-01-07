<?php

namespace App\Observers;

use App\Models\User;
use App\Services\UserObserverService;

class UserObserver
{
    protected $userObserverService;

    public function __construct(UserObserverService $userObserverService)
    {
        $this->userObserverService = $userObserverService;
    }

    public function created(User $user): void
    {
        $this->userObserverService->initializeUserCoins($user);
    }
}

