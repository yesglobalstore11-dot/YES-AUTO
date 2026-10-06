# Guide de déploiement sur Vercel

## Prérequis

- Un compte GitHub avec le code du projet
- Un compte Vercel
- Un projet Supabase configuré

## Étape 1 : Pousser le code sur GitHub

Si ce n'est pas déjà fait :

```bash
git init
git add .
git commit -m "Initial commit - Supabase integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/yes-auto.git
git push -u origin main
```

## Étape 2 : Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur **"Add New..."** → **"Project"**
3. Importez votre dépôt GitHub `yes-auto`
4. Vercel détectera automatiquement Next.js

## Étape 3 : Configurer les variables d'environnement

Dans les settings du projet Vercel, ajoutez les variables d'environnement suivantes :

```
NEXT_PUBLIC_SUPABASE_URL=https://jrudqzperkcxptawebyz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fWOYgeQfTjZzTrT28upa_A_qOF7wYVh
```

Pour ajouter ces variables :
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez chaque variable avec sa valeur
3. Cliquez sur **Save**

## Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez que le build se termine
3. Votre application sera disponible à une URL comme `https://yes-auto.vercel.app`

## Étape 5 : Configurer Supabase

Avant que l'application fonctionne, vous devez :

### 5.1 Exécuter le schéma SQL

1. Allez sur votre dashboard Supabase
2. Naviguez vers **SQL Editor**
3. Copiez le contenu du fichier `supabase/schema.sql`
4. Collez-le et exécutez-le

### 5.2 Créer le bucket Storage

1. Dans Supabase, allez dans **Storage**
2. Créez un bucket nommé `vehicle-images`
3. Cochez **"Public bucket"**
4. Configurez les politiques RLS si nécessaire

## Étape 6 : Tester

Une fois déployé :
1. Visitez votre URL Vercel
2. Testez la navigation sur les pages publiques
3. Testez les formulaires de contact/location/import/export
4. Testez l'admin (si vous avez créé un utilisateur dans Supabase)

## Déploiements automatiques

Après la configuration initiale, chaque push sur la branche `main` déclenchera automatiquement un nouveau déploiement sur Vercel.

## Domaine personnalisé (optionnel)

Pour utiliser votre propre domaine :
1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions de Vercel
