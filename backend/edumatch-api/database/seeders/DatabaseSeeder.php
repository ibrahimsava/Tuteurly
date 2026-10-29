<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appel de notre seeder personnalisé pour insérer les tuteurs et les créneaux
        $this->call(TutorSeeder::class);
    }
}
