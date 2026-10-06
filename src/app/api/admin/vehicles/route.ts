import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    
    const vehicle = await supabase
      .from('vehicles')
      .insert({
        slug: body.slug,
        marque: body.marque,
        modele: body.modele,
        annee: parseInt(body.annee),
        prix: parseInt(body.prix),
        prix_promotionnel: body.prixPromotionnel ? parseInt(body.prixPromotionnel) : null,
        devise: body.devise,
        kilometrage: body.kilometrage ? parseInt(body.kilometrage) : null,
        carburant: body.carburant,
        boite_vitesse: body.boiteVitesse,
        moteur: body.moteur,
        puissance: body.puissance ? parseInt(body.puissance) : null,
        couleur: body.couleur,
        nombre_places: body.nombrePlaces ? parseInt(body.nombrePlaces) : null,
        type: body.type,
        etat: body.etat,
        statut: body.statut,
        localisation: body.localisation,
        description: body.description,
        featured: body.featured,
        hide_price: body.hidePrice,
      })
      .select()
      .single()

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du véhicule' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    
    const { data: vehicles, error } = await supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_images (*),
        promotions (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
