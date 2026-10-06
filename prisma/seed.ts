import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth/password'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yesauto.bf' },
    update: {},
    create: {
      email: 'admin@yesauto.bf',
      name: 'Admin YES AUTO',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create sample vehicles
  const vehicles = [
    {
      slug: 'toyota-land-cruiser-2024',
      marque: 'Toyota',
      modele: 'Land Cruiser',
      annee: 2024,
      prix: 35000000,
      prixPromotionnel: null,
      devise: 'FCFA',
      kilometrage: 5000,
      carburant: 'DIESEL',
      boiteVitesse: 'AUTOMATIQUE',
      moteur: '4.5L V8',
      puissance: 309,
      couleur: 'Blanc',
      nombrePlaces: 7,
      type: 'FOUR_X_FOUR',
      etat: 'Excellent',
      statut: 'DISPONIBLE',
      localisation: 'Ouagadougou',
      description: 'Toyota Land Cruiser 2024 en parfait état. 4x4 avec 7 places, idéal pour les trajets hors route.',
      featured: true,
      hidePrice: false,
    },
    {
      slug: 'mercedes-benz-classe-g-2023',
      marque: 'Mercedes-Benz',
      modele: 'Classe G',
      annee: 2023,
      prix: 85000000,
      prixPromotionnel: 78000000,
      devise: 'FCFA',
      kilometrage: 12000,
      carburant: 'ESSENCE',
      boiteVitesse: 'AUTOMATIQUE',
      moteur: '4.0L V8',
      puissance: 585,
      couleur: 'Noir',
      nombrePlaces: 5,
      type: 'FOUR_X_FOUR',
      etat: 'Excellent',
      statut: 'DISPONIBLE',
      localisation: 'Ouagadougou',
      description: 'Mercedes Classe G 2023, véhicule de luxe avec toutes les options. En promotion limitée.',
      featured: true,
      hidePrice: false,
    },
    {
      slug: 'toyota-corolla-2022',
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2022,
      prix: 15000000,
      prixPromotionnel: null,
      devise: 'FCFA',
      kilometrage: 35000,
      carburant: 'ESSENCE',
      boiteVitesse: 'AUTOMATIQUE',
      moteur: '1.8L',
      puissance: 140,
      couleur: 'Gris',
      nombrePlaces: 5,
      type: 'BERLINE',
      etat: 'Bon',
      statut: 'DISPONIBLE',
      localisation: 'Ouagadougou',
      description: 'Toyota Corolla 2022, berline économique et fiable. Parfaite pour la ville.',
      featured: false,
      hidePrice: false,
    },
    {
      slug: 'honda-cr-v-2023',
      marque: 'Honda',
      modele: 'CR-V',
      annee: 2023,
      prix: 22000000,
      prixPromotionnel: null,
      devise: 'FCFA',
      kilometrage: 18000,
      carburant: 'HYBRIDE',
      boiteVitesse: 'AUTOMATIQUE',
      moteur: '2.0L',
      puissance: 212,
      couleur: 'Bleu',
      nombrePlaces: 5,
      type: 'SUV',
      etat: 'Excellent',
      statut: 'DISPONIBLE',
      localisation: 'Ouagadougou',
      description: 'Honda CR-V 2023 hybride, SUV spacieux et économique en carburant.',
      featured: false,
      hidePrice: false,
    },
    {
      slug: 'toyota-hilux-2024',
      marque: 'Toyota',
      modele: 'Hilux',
      annee: 2024,
      prix: 28000000,
      prixPromotionnel: null,
      devise: 'FCFA',
      kilometrage: 8000,
      carburant: 'DIESEL',
      boiteVitesse: 'MANUELLE',
      moteur: '2.8L',
      puissance: 204,
      couleur: 'Blanc',
      nombrePlaces: 5,
      type: 'PICK_UP',
      etat: 'Excellent',
      statut: 'DISPONIBLE',
      localisation: 'Ouagadougou',
      description: 'Toyota Hilux 2024, pick-up robuste pour le travail et les loisirs.',
      featured: true,
      hidePrice: false,
    },
  ]

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: {},
      create: vehicle,
    })
    console.log('Created vehicle:', vehicle.slug)
  }

  // Create sample promotion
  const promotion = await prisma.promotion.upsert({
    where: { id: 'promo-1' },
    update: {},
    create: {
      id: 'promo-1',
      titre: 'Promotion Spéciale -10%',
      description: 'Profitez de -10% sur tous les véhicules Mercedes jusqu\'au 31 décembre 2024.',
      pourcentageRemise: 10,
      dateDebut: new Date('2024-01-01'),
      dateFin: new Date('2024-12-31'),
      active: true,
    },
  })
  console.log('Created promotion:', promotion.titre)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
