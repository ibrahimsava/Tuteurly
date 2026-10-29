<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tutor extends Model
{
    protected $fillable = ['firstname', 'avatar_url', 'bio', 'experience_years', 'courses_count', 'rating'];

    // Un tuteur enseigne plusieurs matières
    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }

    // Un tuteur possède plusieurs créneaux horaires
    public function slots(): HasMany
    {
        return $this->hasMany(Slot::class);
    }
}
