<?php

namespace Database\Seeders;

use App\Models\Tutor;
use App\Models\Subject;
use App\Models\Slot;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création des matières et niveaux
        $subjectsData = [
            ['name' => 'Mathématiques', 'level' => 'Collège'],
            ['name' => 'Mathématiques', 'level' => 'Lycée'],
            ['name' => 'Physique-Chimie', 'level' => 'Collège'],
            ['name' => 'Physique-Chimie', 'level' => 'Lycée'],
            ['name' => 'Anglais', 'level' => 'Collège'],
            ['name' => 'Anglais', 'level' => 'Lycée'],
            ['name' => 'Français', 'level' => 'Collège'],
            ['name' => 'Français', 'level' => 'Lycée'],
        ];

        $subjects = collect($subjectsData)->map(fn($data) => Subject::create($data));

        // 2. Profils des 10 tuteurs réalistes
        $tutorsData = [
            ['firstname' => 'Lucas', 'experience_years' => 5, 'courses_count' => 120, 'rating' => 4.9, 'bio' => 'Étudiant en Master de Mathématiques à la Sorbonne. Pédagogue et patient.'],
            ['firstname' => 'Emma', 'experience_years' => 3, 'courses_count' => 45, 'rating' => 4.7, 'bio' => 'Bilingue de naissance, je transmets ma passion pour l’anglais de manière ludique.'],
            ['firstname' => 'Thomas', 'experience_years' => 8, 'courses_count' => 310, 'rating' => 5.0, 'bio' => 'Professeur certifié de Physique-Chimie en lycée. Expert en préparation du Bac.'],
            ['firstname' => 'Sarah', 'experience_years' => 2, 'courses_count' => 28, 'rating' => 4.6, 'bio' => 'Spécialisée dans le soutien scolaire pour redonner confiance aux élèves de collège.'],
            ['firstname' => 'Clara', 'experience_years' => 4, 'courses_count' => 85, 'rating' => 4.8, 'bio' => 'Passionnée de littérature française, j’aide à améliorer la méthodologie et l’écriture.'],
            ['firstname' => 'Antoine', 'experience_years' => 6, 'courses_count' => 190, 'rating' => 4.9, 'bio' => 'Ingénieur de formation. J’enseigne les Maths et la Physique avec une approche pratique.'],
            ['firstname' => 'Chloé', 'experience_years' => 1, 'courses_count' => 12, 'rating' => 4.5, 'bio' => 'Étudiante en Lettres Modernes. Idéale pour l’aide aux devoirs et le brevet.'],
            ['firstname' => 'Maxime', 'experience_years' => 7, 'courses_count' => 240, 'rating' => 4.8, 'bio' => 'Ancien prof particulier à plein temps. Approche structurée pour lycéens ambitieux.'],
            ['firstname' => 'Inès', 'experience_years' => 3, 'courses_count' => 60, 'rating' => 4.7, 'bio' => 'Patiente et dynamique, j’aide vos enfants à surmonter leurs blocages en Anglais.'],
            ['firstname' => 'Julien', 'experience_years' => 10, 'courses_count' => 420, 'rating' => 5.0, 'bio' => 'Plus de 10 ans d’expérience en soutien scolaire. Spécialiste toutes matières scientifiques.'],
        ];

        // 3. Liaison et génération des créneaux horaires
        foreach ($tutorsData as $index => $data) {
            $tutor = Tutor::create($data);

            // Assigner 1 à 3 matières aléatoires au tuteur
            $tutor->subjects()->attach(
                $subjects->random(rand(1, 3))->pluck('id')->toArray()
            );

            // Générer 4 créneaux de disponibilité pour la semaine prochaine
            for ($i = 1; $i <= 4; $i++) {
                // Heures de début réalistes (ex: entre 14h et 18h)
                $startTime = Carbon::now()->addDays(rand(1, 7))->setHour(rand(14, 18))->setMinute(0)->setSecond(0);
                $endTime = (clone $startTime)->addHour();

                Slot::create([
                    'tutor_id' => $tutor->id,
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'is_reserved' => false
                ]);
            }
        }
    }
}
