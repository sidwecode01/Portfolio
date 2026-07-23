# Configuration Supabase — Portfolio

Guide pas à pas pour activer le backend (projets dynamiques + admin + métriques).

## 1. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com) → **New project**.
2. Choisis un nom, un mot de passe de base de données, une région proche.
3. Attends que le projet soit prêt (~2 min).

## 2. Créer les tables, le storage et les règles de sécurité

1. Dans le dashboard : **SQL Editor** → **New query**.
2. Copie-colle tout le contenu de [`supabase/schema.sql`](supabase/schema.sql).
3. Clique **Run**. Ça crée :
   - la table `projects` (avec support images / vidéos / liens via le champ `media`),
   - la table `page_views` (métriques de visite),
   - le bucket de stockage `project-media`,
   - les règles RLS (lecture publique, écriture réservée à l'admin connecté).

## 3. Créer ton compte admin

1. Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Renseigne ton **email** et un **mot de passe** solide. Coche « Auto Confirm User ».
3. C'est ce couple email / mot de passe qui te connectera sur `/admin/login`.

> Astuce : dans **Authentication → Providers → Email**, tu peux désactiver
> « Enable sign ups » pour que personne d'autre ne puisse créer de compte.

## 4. Récupérer les clés API

1. Dashboard → **Project Settings** → **API**.
2. Copie **Project URL** et la clé **anon public**.
3. À la racine du dossier `portfolio/`, copie `.env.example` en `.env` :

   ```bash
   cp .env.example .env
   ```

4. Renseigne dans `.env` :

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

5. Redémarre le serveur de dev (`npm run dev`) pour charger les variables.

## 5. (Optionnel) Importer tes projets existants

Les projets codés en dur dans `src/data/projects.js` servent de **fallback**
tant que la table `projects` est vide. Une fois Supabase configuré, va sur
`/admin`, connecte-toi, et clique **« Importer les projets par défaut »** dans
le gestionnaire de projets pour tous les insérer d'un coup dans la base.
Ensuite tu gères tout depuis l'admin.

## 6. Utilisation

- **Site public** : `/` — les projets sont chargés depuis Supabase.
- **Login admin** : `/admin/login`
- **Dashboard métriques** : `/admin`
- **Gestion des projets** : `/admin/projects` (ajout / édition / suppression,
  upload d'images ou de vidéos, ou simple collage de liens YouTube / externes).

## Sécurité

- La clé `anon` est publique (elle est faite pour être exposée côté front) ;
  la sécurité repose sur les règles **RLS** définies dans le schéma SQL.
- Seuls les utilisateurs **authentifiés** peuvent écrire dans `projects`,
  uploader des médias et lire les métriques.
- N'expose **jamais** ta clé `service_role`.
