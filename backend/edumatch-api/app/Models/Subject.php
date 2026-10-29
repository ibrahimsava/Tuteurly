<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
    protected $fillable = ['name', 'level'];

    // Une matière est enseignée par plusieurs tuteurs
    public function tutors(): BelongsToMany
    {
        return $this->belongsToMany(Tutor::class);
    }
}
