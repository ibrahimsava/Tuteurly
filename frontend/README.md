# EduMatch - Système Intelligent de Matching Tuteurs/Élèves

Prototype fonctionnel haut de gamme développé dans le cadre d'un test technique pour une plateforme de soutien scolaire en ligne. L'ensemble du processus de recherche, scoring, matching et réservation est automatisé à 100%, sans aucune intervention humaine.

---

## 🚀 Fonctionnalités Clés & Expérience Utilisateur (UI/UX)

*   **Parcours Single-Page Flow :** Formulaire asymétrique avec illustration éducative immersive intégrée pour rassurer l'utilisateur et réduire le taux de rebond.
*   **Algorithme de Matching Strict :** Filtrage initial impératif par matière, niveau scolaire et disponibilités réelles futures.
*   **Système de Scoring & Pertinence :** Classement dynamique des tuteurs via une formule pondérée : 
    $$\text{Score} = (\text{Note} \times 10) + (\text{Années d'expérience} \times 2) + \left(\frac{\text{Cours donnés}}{10}\right)$$
*   **Réservation Atomique Instantanée :** Validation en un clic sans validation administrative avec blocage immédiat du créneau horaire pour éviter tout double-booking.
*   **Design Premium Minimaliste :** Effets de flou d'arrière-plan (*glassmorphism*), micro-interactions fluides et animations de chargement et d'apparition asynchrones basées sur Tailwind CSS.

---

## 🛠️ Stack Technique

*   **Frontend :** React 18+ (Vite, Axios, Tailwind CSS)
*   **Backend API :** Laravel 11 (Architecture REST, JSON, API standardisée)
*   **Base de données :** PostgreSQL (Persistance complète, intégrité référentielle, clés composites)

---

## 📦 Installation et Lancement en Local

### 1. Prérequis
Assurez-vous d'avoir installé **PHP 8.2+**, **Composer**, **Node.js (v18+)** et un serveur **PostgreSQL** actif.

### 2. Configuration du Backend (Laravel API)
1. Entrez dans le dossier backend :
   ```bash
   cd edumatch-api
   ```
2. Installez les dépendances PHP :
   ```bash
   composer install
   ```
3. Copiez le fichier d'environnement et configurez vos accès PostgreSQL :
   ```bash
   cp .env.example .env
   ```
   *Ajustez les lignes suivantes dans votre `.env` :*
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=tuteurly
   DB_USERNAME=postgres
   DB_PASSWORD=root  # Votre mot de passe PostgreSQL changé en local
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```
4. Générez la clé d'application et lancez les migrations avec le jeu de données des 10 tuteurs :
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```
5. Lancez le serveur d'API :
   ```bash
   php artisan serve
   ```
   *L'API est désormais accessible sur `http://127.0.0.1:8000`.*

### 3. Configuration du Frontend (React + Vite)
1. Ouvrez un nouveau terminal et entrez dans le dossier frontend :
   ```bash
   cd edumatch-front
   ```
2. Installez les paquets Node.js :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   *Ouvrez votre navigateur sur `http://localhost:5173` pour tester l'application.*

---

## 💡 Choix Techniques & Pragmatisme Évolutif

*   **Données Persistantes Réelles :** Aucun mock statique côté front. Les disponibilités sont calculées dynamiquement sous forme d'objets `DateTime` via la puissance de Carbon côté backend.
*   **Relations SQL Robustes :** Implémentation d'une table pivot `subject_tutor` avec clé primaire composite pour lier efficacement les matières aux tuteurs.
*   **Sécurité CORS & CSRF :** Configuration du middleware d'exclusion CSRF sur les endpoints d'API pour permettre un interfaçage découplé fluide en environnement de développement local.
