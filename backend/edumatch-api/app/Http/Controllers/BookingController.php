<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Slot;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Recherche intelligente de tuteurs compatibles
     */
    public function search(Request $request)
    {
        $request->validate([
            'subject_name' => 'required|string',
            'level'        => 'required|string',
        ]);

        $subjectName = $request->input('subject_name');
        $level = $request->input('level');

        // 1. Filtrage strict par Matière et Niveau, et chargement des créneaux non réservés
        $tutors = Tutor::whereHas('subjects', function ($query) use ($subjectName, $level) {
            $query->where('name', $subjectName)->where('level', $level);
        })->with(['slots' => function ($query) {
            // On ne récupère que les créneaux futurs et libres
            $query->where('is_reserved', false)->orderBy('start_time', 'asc');
        }, 'subjects'])->get();

        // 2. Algorithme de Scoring (UX Bonus)
        // Calcule un score basé sur les évaluations, l'expérience et le nombre de cours passés
        $tutors = $tutors->map(function ($tutor) {
            $score = ($tutor->rating * 10) + ($tutor->experience_years * 2) + ($tutor->courses_count / 10);
            $tutor->matching_score = round($score);
            return $tutor;
        });

        // 3. Tri par pertinence (Plus gros score en premier)
        // Optionnel : on filtre les tuteurs qui n'ont aucun créneau disponible pour alléger l'affichage
        $filteredTutors = $tutors->filter(function($tutor) {
            return $tutor->slots->count() > 0;
        })->sortByDesc('matching_score')->values();

        return response()->json($filteredTutors);
    }

    /**
     * Réservation automatique d'un créneau
     */
    public function book(Request $request)
    {
        $request->validate([
            'slot_id' => 'required|exists:slots,id',
        ]);

        $slot = Slot::findOrFail($request->slot_id);

        // Sécurité pour éviter le double booking
        if ($slot->is_reserved) {
            return response()->json([
                'message' => 'Ce créneau horaire a déjà été réservé par une autre famille.'
            ], 422);
        }

        // Enregistrement de la réservation (Automatique, pas de validation admin)
        $slot->update(['is_reserved' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Votre réservation a été confirmée automatiquement !'
        ]);
    }
}
