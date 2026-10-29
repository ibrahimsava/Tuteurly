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
    Schema::create('tutors', function (Blueprint $table) {
        $table->id();
        $table->string('firstname');
        $table->string('avatar_url')->nullable();
        $table->text('bio');
        $table->integer('experience_years');
        $table->integer('courses_count')->default(0);
        $table->float('rating')->default(5.0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutors');
    }
};
