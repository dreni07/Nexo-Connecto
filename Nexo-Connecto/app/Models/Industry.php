<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    protected $fillable = [
        'industry_name'
    ];

    public function companyProfiles()
    {
        return $this->hasMany(CompanyProfile::class, 'company_industry');
    }
}
