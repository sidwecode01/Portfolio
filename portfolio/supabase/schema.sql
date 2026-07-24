-- ============================================================
--  Schema Supabase pour le portfolio (projets + metriques admin)
--  A executer dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ============================================================
--  1. Table des projets
-- ============================================================
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  tagline       text,
  description   text,
  overview      text,
  problem       text,
  solution      text,
  role          text,
  architecture  text,
  cover_image   text,                       -- URL de l'image de couverture
  technologies  text[]   not null default '{}',
  features      text[]   not null default '{}',
  challenges    text[]   not null default '{}',
  solutions     text[]   not null default '{}',
  results       text[]   not null default '{}',
  next_steps    text[]   not null default '{}',
  -- media : tableau d'objets { type: 'image'|'video'|'link', url, label }
  media         jsonb    not null default '[]'::jsonb,
  -- links : { live: '...', github: '...' }
  links         jsonb    not null default '{}'::jsonb,
  featured      boolean  not null default false,
  sort_order    integer  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists projects_featured_idx on public.projects (featured);
create index if not exists projects_sort_idx     on public.projects (sort_order);

-- Met a jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
--  2. Table des visites (metriques)
-- ============================================================
create table if not exists public.page_views (
  id            bigint generated always as identity primary key,
  path          text not null,
  referrer      text,
  session_id    text,                        -- identifiant anonyme de session (localStorage)
  user_agent    text,
  country       text,                        -- pays du visiteur (ex: "France")
  country_code  text,                        -- code ISO 2 lettres (ex: "FR")
  created_at    timestamptz not null default now()
);

-- Pour les bases deja creees avant l'ajout des colonnes pays :
alter table public.page_views add column if not exists country      text;
alter table public.page_views add column if not exists country_code text;

create index if not exists page_views_created_idx on public.page_views (created_at);
create index if not exists page_views_path_idx    on public.page_views (path);
create index if not exists page_views_country_idx on public.page_views (country_code);

-- ============================================================
--  3. Liste blanche des administrateurs
-- ============================================================
-- Seuls les utilisateurs listes ici ont les droits d'admin.
-- Un simple compte Supabase ne suffit PAS.
create table if not exists public.admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Un utilisateur peut voir SA propre ligne (permet au front de savoir s'il est admin).
drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

-- Fonction d'aide : renvoie true si l'utilisateur courant est admin.
-- SECURITY DEFINER pour eviter la recursion RLS lors de l'appel dans les policies.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ============================================================
--  4. Row Level Security (RLS)
-- ============================================================
alter table public.projects   enable row level security;
alter table public.page_views enable row level security;

-- --- projects : lecture publique, ecriture reservee aux connectes (admin) ---
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  using (true);

drop policy if exists "projects_admin_insert" on public.projects;
create policy "projects_admin_insert"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "projects_admin_update" on public.projects;
create policy "projects_admin_update"
  on public.projects for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- --- page_views ---
-- L'insertion se fait UNIQUEMENT via la fonction serverless Vercel /api/track,
-- qui utilise la cle service_role (celle-ci contourne le RLS). On NE cree donc
-- aucune policy d'insert : anon/authenticated ne peuvent pas ecrire ici.
-- (Si tu avais deja cree la policy publique, cette ligne la supprime.)
drop policy if exists "page_views_public_insert" on public.page_views;

-- Seul l'admin connecte peut lire les stats.
drop policy if exists "page_views_admin_read" on public.page_views;
create policy "page_views_admin_read"
  on public.page_views for select
  to authenticated
  using (public.is_admin());

-- ============================================================
--  5. Storage : bucket public pour les medias des projets
-- ============================================================
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

-- Lecture publique des medias
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'project-media');

-- Upload / modification / suppression reserves aux admins de la liste blanche
drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-media' and public.is_admin());

-- ============================================================
--  6. Table des certifications
-- ============================================================
create table if not exists public.certifications (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  issuer         text,                       -- organisme (Coursera, Epitech...)
  year           text,                       -- annee ou date d'obtention
  credential_url text,                       -- lien de verification du certificat
  image          text,                       -- logo / badge (URL, optionnel)
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists certifications_sort_idx on public.certifications (sort_order);

drop trigger if exists certifications_set_updated_at on public.certifications;
create trigger certifications_set_updated_at
  before update on public.certifications
  for each row execute function public.set_updated_at();

alter table public.certifications enable row level security;

-- Lecture publique, ecriture reservee aux admins de la liste blanche.
drop policy if exists "certifications_public_read" on public.certifications;
create policy "certifications_public_read"
  on public.certifications for select
  using (true);

drop policy if exists "certifications_admin_insert" on public.certifications;
create policy "certifications_admin_insert"
  on public.certifications for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "certifications_admin_update" on public.certifications;
create policy "certifications_admin_update"
  on public.certifications for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "certifications_admin_delete" on public.certifications;
create policy "certifications_admin_delete"
  on public.certifications for delete
  to authenticated
  using (public.is_admin());

-- ============================================================
--  Termine. Etapes finales pour DEVENIR admin :
--
--  1) Cree ton compte : Dashboard > Authentication > Users > Add user
--     (email + password, coche "Auto Confirm User").
--
--  2) Copie l'UID de cet utilisateur (colonne "UID" dans la liste Users)
--     et declare-le admin en executant :
--
--       insert into public.admins (user_id)
--       values ('COLLE-ICI-TON-UID')
--       on conflict do nothing;
--
--  3) (Recommande) Desactive les inscriptions publiques :
--     Authentication > Providers > Email > decoche "Enable sign ups".
--
--  Sans ligne dans public.admins, un compte connecte n'a AUCUN droit
--  d'ecriture ni d'acces aux metriques : le panel admin lui est refuse.
-- ============================================================
