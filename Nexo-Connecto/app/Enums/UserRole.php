<?php

namespace App\Enums;

enum UserRole: string
{
    case Student = 'student';
    case Company = 'company';

    
    public function value(): string
    {
        return $this->value;
    }

    
    public function name(): string
    {
        return $this->value;
    }

    
    public function getId(): ?int
    {
        $role = \App\Models\Role::where('role_name', $this->value)->first();
        return $role?->id;
    }

    
    public static function fromName(string $name): ?self
    {
        return self::tryFrom($name);
    }

    
    public static function fromId(int $id): ?self
    {
        $role = \App\Models\Role::find($id);
        if (!$role) {
            return null;
        }
        return self::tryFrom($role->role_name);
    }

    
    public function matches(int $roleId): bool
    {
        return $this->getId() === $roleId;
    }

  
    public function matchesName(string $roleName): bool
    {
        return $this->value === $roleName;
    }
}

