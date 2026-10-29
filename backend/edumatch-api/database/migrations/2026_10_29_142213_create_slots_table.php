<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('slots', function (Blueprint $table) {
        $table->id();
        $table->foreignId('tutor_id')->constrained()->onDelete('cascade');
        $table->dateTime('start_time'); // Ex: 2026-11-02 14:00:00
        $table->dateTime('end_time');   // Ex: 2026-11-02 15:00:00
        $table->boolean('is_reserved')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slots');
    }
};
