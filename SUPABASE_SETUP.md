# Guide de configuration Supabase

## Étape 1 : Créer le fichier .env.local

Créez manuellement le fichier `.env.local` à la racine du projet (`C:\Users\TOSHIBA\CascadeProjects\yes-auto\.env.local`) avec le contenu suivant :

```env
NEXT_PUBLIC_SUPABASE_URL=https://jrudqzperkcxptawebyz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fWOYgeQfTjZzTrT28upa_A_qOF7wYVh
```

**Note :** Ce fichier est déjà ignoré par Git via `.gitignore`, donc vos credentials resteront privés.

---

## Étape 2 : Exécuter le schéma SQL dans Supabase

1. Connectez-vous à votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Naviguez vers **SQL Editor** dans le menu de gauche
4. Cliquez sur **"New Query"**
5. Copiez le contenu du fichier `supabase/schema.sql` situé dans ce projet
6. Collez-le dans l'éditeur SQL
7. Cliquez sur **"Run"** pour exécuter le script

Cela créera toutes les tables nécessaires :
- `users`
- `vehicles`
- `vehicle_images`
- `promotions`
- `contact_messages`
- `rental_requests`
- `import_requests`
- `export_requests`

---

## Étape 3 : Créer le bucket Storage pour les images

1. Dans le dashboard Supabase, naviguez vers **Storage**
2. Cliquez sur **"Create a new bucket"**
3. Nommez le bucket : `vehicle-images`
4. Cochez l'option **"Public bucket"** pour permettre l'accès public aux images
5. Cliquez sur **"Create bucket"**

---

## Étape 4 : Configurer les politiques RLS (Row Level Security)

Pour sécuriser votre base de données, exécutez le SQL suivant dans le SQL Editor :

```sql
-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access for vehicles and images
CREATE POLICY "Public read access for vehicles" ON vehicles
  FOR SELECT USING (true);

CREATE POLICY "Public read access for vehicle images" ON vehicle_images
  FOR SELECT USING (true);

-- Allow public insert for contact forms
CREATE POLICY "Public insert for contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert for rental requests" ON rental_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert for import requests" ON import_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert for export requests" ON export_requests
  FOR INSERT WITH CHECK (true);
```

---

## Étape 5 : Tester l'application

Une fois toutes les étapes ci-dessus terminées :

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Accédez à `http://localhost:3000`

3. Testez les fonctionnalités :
   - Navigation sur la page des véhicules
   - Création d'un véhicule via l'admin (`/admin/vehicules/new`)
   - Upload d'images
   - Soumission des formulaires de contact/location/import/export

---

## Résolution de problèmes

### Erreur "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Vérifiez que le fichier `.env.local` existe à la racine du projet
- Redémarrez le serveur de développement après avoir créé le fichier

### Erreur "Bucket not found" lors de l'upload
- Vérifiez que le bucket `vehicle-images` existe dans Storage
- Vérifiez que le bucket est configuré comme public

### Erreur "Table does not exist"
- Vérifiez que le schéma SQL a été exécuté correctement
- Vérifiez dans le dashboard Supabase que toutes les tables existent
