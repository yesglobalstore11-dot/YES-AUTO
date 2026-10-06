-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'USER',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  marque TEXT NOT NULL,
  modele TEXT NOT NULL,
  annee INTEGER NOT NULL,
  prix INTEGER NOT NULL,
  prix_promotionnel INTEGER,
  devise TEXT DEFAULT 'FCFA',
  kilometrage INTEGER,
  carburant TEXT,
  boite_vitesse TEXT,
  moteur TEXT,
  puissance INTEGER,
  couleur TEXT,
  nombre_places INTEGER,
  type TEXT,
  etat TEXT,
  statut TEXT DEFAULT 'DISPONIBLE',
  localisation TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  hide_price BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle images table
CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promotions table
CREATE TABLE IF NOT EXISTS promotions (
  id TEXT PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  pourcentage_remise INTEGER,
  date_debut TIMESTAMP WITH TIME ZONE,
  date_fin TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT,
  telephone TEXT,
  message TEXT NOT NULL,
  statut TEXT DEFAULT 'NOUVEAU',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rental requests table
CREATE TABLE IF NOT EXISTS rental_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT,
  telephone TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  type_vehicule TEXT,
  message TEXT,
  statut TEXT DEFAULT 'EN_ATTENTE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Import requests table
CREATE TABLE IF NOT EXISTS import_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT,
  telephone TEXT NOT NULL,
  pays_origine TEXT NOT NULL,
  marque TEXT,
  modele TEXT,
  annee_souhaitee INTEGER,
  budget INTEGER,
  message TEXT,
  statut TEXT DEFAULT 'EN_ATTENTE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Export requests table
CREATE TABLE IF NOT EXISTS export_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT,
  telephone TEXT NOT NULL,
  pays_destination TEXT NOT NULL,
  vehicule_recherche TEXT NOT NULL,
  quantite INTEGER DEFAULT 1,
  budget INTEGER,
  message TEXT,
  statut TEXT DEFAULT 'EN_ATTENTE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_statut ON vehicles(statut);
CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_statut ON contact_messages(statut);
CREATE INDEX IF NOT EXISTS idx_rental_requests_statut ON rental_requests(statut);
CREATE INDEX IF NOT EXISTS idx_import_requests_statut ON import_requests(statut);
CREATE INDEX IF NOT EXISTS idx_export_requests_statut ON export_requests(statut);
