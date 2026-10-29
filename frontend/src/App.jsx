import React, { useState } from 'react';
import axios from 'axios';

// 1. Configuration de l'URL de base pour pointer vers le serveur Laravel
const API_URL = 'http://127.0.0.1:8000/api';

/*
  DIRECTION : écran scindé, rail vert forêt + zone de travail claire
  Forêt   #0B2B26 (rail, texte)    Forêt 2 #123A33 (survol)
  Papier  #F7F8F5                  Menthe  #E3F2EA
  Filet   #D9DFDA                  Discret #5E6F69   Discret sur forêt #9DB8AF
  Orange  #FF5A1F  (bouton principal, niveau, logo : rien d'autre)
  Typo    Unbounded (titres, chiffres) + Hanken Grotesk (texte)
*/

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [formData, setFormData] = useState({ subject_name: '', level: '' });
  const [tutors, setTutors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const availableOptions = {
    subjects: ['Mathématiques', 'Physique-Chimie', 'Anglais', 'Français'],
    levels: ['Collège', 'Lycée']
  };

  // 2. Appel API pour rechercher et filtrer les tuteurs (Algorithme de Matching)
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/search-tutors`, formData);
      setTutors(response.data);
      setStep(2);
    } catch (err) {
      console.error("Erreur lors du matching :", err);
      alert("Impossible de récupérer les tuteurs compatibles pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Appel API pour réserver instantanément un créneau disponible
  const handleBook = async (slotId) => {
    setBookingLoading(true);
    try {
      const response = await axios.post(`${API_URL}/book-slot`, { slot_id: slotId });
      if (response.data.success) {
        setSuccessMessage(response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erreur lors de la réservation.";
      alert(errorMsg);
    } finally {
      setBookingLoading(false);
    }
  };

  const resetAll = () => {
    setSuccessMessage('');
    setStep(1);
    setFormData({ subject_name: '', level: '' });
  };

  const canSubmit = formData.subject_name && formData.level && !loading;
  const { subject_name: subject, level } = formData;

  return (
    <div className="font-body min-h-screen bg-[#F7F8F5] text-[#0B2B26] antialiased selection:bg-[#FF5A1F] selection:text-[#0B2B26] lg:grid lg:grid-cols-[minmax(340px,5fr)_7fr]">
      {/* ------------------------------ RAIL ------------------------------ */}
      <aside className="flex flex-col gap-10 bg-[#0B2B26] px-6 py-8 text-white sm:px-10 lg:sticky lg:top-0 lg:h-screen lg:justify-between lg:px-12 lg:py-12">
        <a href="/" className="flex w-fit items-center gap-2.5 font-display text-lg font-bold tracking-tight">
          <span className="h-3 w-3 rounded-full bg-[#FF5A1F]" aria-hidden="true" />
          EduMatch
        </a>

        {successMessage ? (
          <div className="swap">
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Réservé.</h1>
            <p className="mt-4 max-w-sm text-[#9DB8AF]">Votre cours est confirmé.</p>
          </div>
        ) : step === 1 ? (
          <>
            <div>
              <h1 className="font-display text-[26px] font-bold leading-[1.15] tracking-tight sm:text-3xl lg:text-[34px]">
                Le bon tuteur, au bon moment.
              </h1>
              <p className="mt-4 max-w-sm leading-relaxed text-[#9DB8AF]">
                Choisissez la matière et le niveau. Nous classons les tuteurs libres par pertinence.
              </p>
            </div>

            {/* Lecture en direct de la sélection */}
            <div aria-hidden="true" className="hidden lg:block">
              <p className="mb-3 text-sm font-medium text-[#9DB8AF]">Votre recherche</p>
              <p
                key={subject || 'no-subject'}
                className={`swap font-display text-[clamp(1.5rem,2.5vw,2.3rem)] font-bold leading-[1.1] ${subject ? '' : 'opacity-25'}`}
              >
                {subject || 'Matière'}
              </p>
              <p
                key={level || 'no-level'}
                className={`swap mt-2 font-display text-2xl font-bold ${level ? 'text-[#FF5A1F]' : 'opacity-25'}`}
              >
                {level || 'Niveau'}
              </p>
            </div>
          </>
        ) : (
          <div className="swap">
            <button
              onClick={() => setStep(1)}
              className="mb-8 text-sm font-semibold text-[#9DB8AF] underline decoration-[#9DB8AF]/40 underline-offset-4 hover:text-white hover:decoration-white"
            >
              Modifier la recherche
            </button>
            <h1 aria-live="polite" className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {tutors.length} {tutors.length > 1 ? 'tuteurs disponibles' : 'tuteur disponible'}
            </h1>
            <p className="mt-6 font-display text-xl font-bold">{subject}</p>
            <p className="mt-1 font-display text-lg font-bold text-[#FF5A1F]">{level}</p>
          </div>
        )}

        <p className="hidden text-sm text-[#9DB8AF] lg:block">Cours en visioconférence, créneaux d'une heure.</p>
      </aside>

      {/* --------------------------- ZONE DE TRAVAIL --------------------------- */}
      <main className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
        {successMessage ? (
          <div role="status" className="swap max-w-md py-6">
            <svg viewBox="0 0 64 64" className="mb-8 h-20 w-20" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="28" stroke="#0B2B26" strokeWidth="3" className="draw-circle" />
              <path d="M20 33l8 8 16-17" stroke="#FF5A1F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
            </svg>
            <p className="mb-10 text-lg leading-relaxed">{successMessage}</p>
            <button
              onClick={resetAll}
              className="rounded-xl bg-[#0B2B26] px-7 py-4 font-bold text-white transition-colors hover:bg-[#123A33]"
            >
              Réserver un autre cours
            </button>
          </div>
        ) : step === 1 ? (
          /* ------------------------- Étape 1 : critères ------------------------- */
          <form onSubmit={handleSearch} className="swap max-w-xl">
            <fieldset>
              <legend className="mb-3 text-sm font-bold text-[#5E6F69]">Matière</legend>
              <div className="border-t border-[#D9DFDA]">
                {availableOptions.subjects.map((sub) => {
                  const selected = subject === sub;
                  return (
                    <button
                      type="button"
                      key={sub}
                      aria-pressed={selected}
                      onClick={() => setFormData({ ...formData, subject_name: sub })}
                      className={`flex w-full items-center justify-between border-b border-[#D9DFDA] px-3 py-5 text-left text-lg font-semibold transition-colors ${
                        selected ? 'bg-[#E3F2EA]' : 'hover:bg-white'
                      }`}
                    >
                      {sub}
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                          selected ? 'border-[#0B2B26] bg-[#0B2B26]' : 'border-[#B8C2BC]'
                        }`}
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="mb-3 text-sm font-bold text-[#5E6F69]">Niveau scolaire</legend>
              <div className="grid grid-cols-2 gap-3">
                {availableOptions.levels.map((lvl) => {
                  const selected = level === lvl;
                  return (
                    <button
                      type="button"
                      key={lvl}
                      aria-pressed={selected}
                      onClick={() => setFormData({ ...formData, level: lvl })}
                      className={`rounded-xl border-2 py-5 text-center font-display text-base font-bold transition-colors ${
                        selected
                          ? 'border-[#0B2B26] bg-[#0B2B26] text-white'
                          : 'border-[#D9DFDA] bg-white hover:border-[#0B2B26]'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-[#FF5A1F] px-8 py-4 text-base font-bold text-[#0B2B26] transition-colors hover:bg-[#FF7440] disabled:cursor-not-allowed disabled:bg-[#E6EAE7] disabled:text-[#8A9791] sm:w-auto"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Recherche en cours…</span>
                </>
              ) : (
                'Voir les tuteurs disponibles'
              )}
            </button>
          </form>
        ) : (
          /* ----------------------- Étape 2 : tuteurs matchés ----------------------- */
          <div className="swap max-w-3xl">
            {tutors.length === 0 ? (
              <div className="border-t border-[#D9DFDA] py-12">
                <p className="font-display text-xl font-bold">Aucun tuteur libre pour ces critères.</p>
                <p className="mb-6 mt-2 text-[#5E6F69]">Changez de matière ou de niveau pour voir d'autres profils.</p>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl bg-[#0B2B26] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#123A33]"
                >
                  Modifier la recherche
                </button>
              </div>
            ) : (
              <ul>
                {tutors.map((tutor) => {
                  const score = Math.max(0, Math.min(100, Number(tutor.matching_score) || 0));
                  return (
                    <li key={tutor.id} className="border-t border-[#D9DFDA] py-8 first:border-t-0 first:pt-0">
                      {/* En-tête du profil */}
                      <div className="flex items-start gap-4">
                        <div
                          aria-hidden="true"
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#E3F2EA] font-display text-lg font-bold"
                        >
                          {tutor.firstname.charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h2 className="font-display text-lg font-bold tracking-tight">{tutor.firstname}</h2>
                            <span className="text-sm font-bold">
                              <span aria-hidden="true">★ </span>
                              {tutor.rating?.toFixed(1) ?? '—'}
                              <span className="sr-only"> sur 5</span>
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm font-medium text-[#5E6F69]">
                            {tutor.experience_years} {tutor.experience_years > 1 ? 'ans' : 'an'} d'expérience, {tutor.courses_count}{' '}
                            {tutor.courses_count > 1 ? 'cours donnés' : 'cours donné'}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-display text-2xl font-bold leading-none">
                            {score}
                            <span className="ml-0.5 text-sm">%</span>
                          </p>
                          <p className="mt-1 text-xs font-medium text-[#5E6F69]">pertinence</p>
                        </div>
                      </div>

                      {/* Barre de pertinence */}
                      <div
                        role="img"
                        aria-label={`Pertinence ${score} %`}
                        className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#E3F2EA]"
                      >
                        <div className="h-full rounded-full bg-[#0B2B26]" style={{ width: `${score}%` }} />
                      </div>

                      <p className="mt-5 max-w-prose leading-relaxed">{tutor.bio}</p>

                      {/* Créneaux */}
                      <p className="mb-3 mt-6 text-sm font-bold text-[#5E6F69]">Créneaux libres de 1 h</p>
                      <div className="flex flex-wrap gap-2">
                        {tutor.slots.map((slot) => {
                          const dateObj = new Date(slot.start_time);
                          const formattedDate = dateObj.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
                          const formattedTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

                          return (
                            <button
                              key={slot.id}
                              disabled={bookingLoading}
                              onClick={() => handleBook(slot.id)}
                              aria-label={`Réserver le ${formattedDate} à ${formattedTime}`}
                              className="flex min-w-[104px] flex-col items-start rounded-xl border-2 border-[#D9DFDA] bg-white px-4 py-3 text-left transition-colors hover:border-[#0B2B26] hover:bg-[#0B2B26] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#D9DFDA] disabled:hover:bg-white disabled:hover:text-[#0B2B26]"
                            >
                              <span className="text-xs font-medium capitalize opacity-70">{formattedDate}</span>
                              <span className="font-display text-base font-bold tabular-nums">{formattedTime}</span>
                            </button>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Unbounded', 'Hanken Grotesk', system-ui, sans-serif; }
        .font-body    { font-family: 'Hanken Grotesk', system-ui, sans-serif; }

        button:focus-visible, a:focus-visible { outline: 3px solid #FF5A1F; outline-offset: 3px; }

        /* Mouvement : répond aux actions (sélection, changement d'étape, confirmation) */
        .swap { animation: swap .3s ease-out; }
        @keyframes swap { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

        .draw-circle { stroke-dasharray: 176; stroke-dashoffset: 176; animation: draw .6s ease-out forwards; }
        .draw-check  { stroke-dasharray: 40;  stroke-dashoffset: 40;  animation: draw .4s .45s ease-out forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }

        @media (prefers-reduced-motion: reduce) {
          .swap { animation: none; }
          .draw-circle, .draw-check { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}