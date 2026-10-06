# YES AUTO - Plateforme Automobile

Plateforme web complète pour YES AUTO, une entreprise automobile au Burkina Faso. Le site permet la vente, la location, l'importation et l'exportation de véhicules, avec un panneau d'administration pour gérer le catalogue et les demandes clients.

## 🚀 Fonctionnalités

### Frontend Public
- **Page d'accueil** avec section hero et présentation des services
- **Catalogue de véhicules** avec filtres (marque, type, prix, année, etc.)
- **Fiche véhicule détaillée** avec galerie et boutons de contact
- **Pages de services** : Vente, Location, Importation, Exportation
- **Page promotions** pour les offres spéciales
- **Page contact** avec formulaire et liens vers les réseaux sociaux
- **Page à propos** présentant l'entreprise
- **Bouton WhatsApp flottant** pour contact rapide

### Administration
- **Connexion sécurisée** avec authentification par mot de passe
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des véhicules** (CRUD complet)
- **Gestion des demandes** (messages, locations, importations, exportations)
- **Upload d'images** via Supabase Storage

### Technique
- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Prisma ORM** avec PostgreSQL (Supabase)
- **Supabase Storage** pour les images
- **SEO optimisé** (sitemap, robots.txt, metadata)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Un compte Supabase (PostgreSQL + Storage)
- Git

## 🛠️ Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd yes-auto
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos informations Supabase :
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialiser la base de données :
```bash
npx prisma generate
npx prisma db push
```

5. Lancer le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
yes-auto/
├── prisma/
│   └── schema.prisma          # Schéma de la base de données
├── public/                    # Fichiers statiques
├── src/
│   ├── app/                   # Pages Next.js (App Router)
│   │   ├── (public)/         # Pages publiques
│   │   ├── admin/             # Pages d'administration
│   │   └── api/               # Routes API
│   ├── components/
│   │   ├── home/              # Composants de la page d'accueil
│   │   ├── layout/           # Header, Footer
│   │   ├── ui/                # Composants UI réutilisables
│   │   ├── vehicles/         # Composants liés aux véhicules
│   │   └── whatsapp-float.tsx
│   └── lib/
│       ├── auth/              # Authentification et sessions
│       ├── db/                # Client Prisma
│       ├── storage/           # Supabase Storage
│       ├── utils/             # Utilitaires
│       └── whatsapp/          # Intégration WhatsApp
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Administration

Pour accéder au panneau d'administration :

1. Créez un compte admin via la base de données ou utilisez Prisma Studio :
```bash
npx prisma studio
```

2. Connectez-vous sur [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

3. Le mot de passe est hashé avec bcryptjs pour la sécurité.

## 📱 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement à chaque push

### Autres plateformes

Le projet peut être déployé sur n'importe quelle plateforme supportant Next.js :
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 🧪 Tests

```bash
npm run test
```

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée un build de production
- `npm start` - Lance le serveur de production
- `npm run lint` - Exécute ESLint
- `npx prisma studio` - Ouvre Prisma Studio
- `npx prisma generate` - Génère le client Prisma
- `npx prisma db push` - Synchronise le schéma avec la base de données

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

Ce projet est la propriété de YES AUTO.

## 📞 Contact

- **Téléphones** : +226 65 92 46 19, +226 01 65 07 66, +226 58 37 19 27
- **WhatsApp** : +226 65 92 46 19
- **Email** : contact@yesauto.bf
- **Localisation** : Ouagadougou, Burkina Faso

## 🌐 Réseaux Sociaux

- Instagram : [@yes_auto11](https://www.instagram.com/yes_auto11)
- TikTok : [@yes.auto1](https://www.tiktok.com/@yes.auto1)
- Facebook : [YES AUTO](https://www.facebook.com/share/1FFGbjiY1F/)
# YES-AUTO
# YES-AUTO
