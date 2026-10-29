<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Slot extends Model
{
    protected $fillable = ['tutor_id', 'start_time', 'end_time', 'is_reserved'];

    // Un créneau appartient à un unique tuteur
    public function tutor(): BelongsTo
    {
        return $this->belongsTo(Tutor::class);
    }
}
