# EduMatch - Plateforme de Matching Tuteurs/Élèves

[![Laravel](https://shields.io)](https://laravel.com)
[![React](https://shields.io)](https://react.dev)
[![Vite](https://shields.io)](https://vite.dev)
[![Tailwind CSS](https://shields.io)](https://tailwindcss.com)
[![PostgreSQL](https://shields.io)](https://postgresql.org)

---

## 📝 Présentation du projet
EduMatch (Tuteurly) est une application web Full-Stack conçue pour simplifier la recherche et la réservation de cours particuliers en ligne. Elle permet aux parents de renseigner les besoins de leurs enfants, de découvrir automatiquement les professeurs compatibles avec leurs critères via un algorithme intelligent, et de réserver directement un créneau disponible sans aucune intervention humaine.

**Dernier Commit Validé :  initialisation du prototype edumatch complet avec interface premium et api laravel*  
**Auteur :** Savadogo Ibrahim

---

## 🛠️ Fonctionnalités & Logique Produit

* **Parcours Single-Page Flow :** Interface asymétrique premium dotée d'une illustration éducative immersive pour une expérience utilisateur fluide et rassurante.
* **Algorithme de Matching Strict :** Filtrage instantané en base de données par matière enseignée, niveau scolaire (Collège/Lycée) et vérification des disponibilités réelles.
* **Scoring de Pertinence Dynamique :** Classement automatique des tuteurs selon la formule de poids : `Score = (Note * 10) + (Expérience * 2) + (Cours donnés / 10)`.
* **Réservation Instantanée :** Processus atomique interdisant les conflits de planification (anti Double-Booking) et validation 100% automatisée.

---

## 🚀 Guide d'Installation et Lancement Local

### Étape 1 : Récupération du projet
Si ce n'est pas déjà fait, clonez le dépôt et placez-vous à la racine :
```bash
git clone https://github.com
cd Tuteurly
```

### Étape 2 : Configuration du Backend (Laravel API)
1. Déplacez-vous dans le dossier de l'API :
   ```bash
   cd backend/edumatch-api
   ```
2. Installez les packages PHP via Composer :
   ```bash
   composer install
   ```
3. Créez votre fichier de configuration d'environnement :
   ```bash
   cp .env.example .env
   ```
4. Ouvrez le fichier `.env` et ajustez les paramètres de connexion PostgreSQL :
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=tuteurly
   DB_USERNAME=postgres
   DB_PASSWORD=root  # Mettez votre mot de passe PostgreSQL local
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```
5. Générez la clé de l'application, appliquez les structures de tables et injectez les 10 tuteurs factices :
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```
6. Démarrez le serveur API :
   ```bash
   php artisan serve
   ```
   *Le serveur tourne sur `http://127.0.0.1:8000` .*

### Étape 3 : Configuration du Frontend (React + Vite)
1. Ouvrez un second terminal à la racine du projet, puis allez dans le dossier frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement de l'interface web :
   ```bash
   npm run dev
   ```
   *L'application est consultable sur `http://localhost:5173` .*
