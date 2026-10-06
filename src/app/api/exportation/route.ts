import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('export_requests')
      .insert({
        nom: body.nom,
        email: body.email,
        telephone: body.telephone,
        pays_destination: body.paysDestination,
        vehicule_recherche: body.vehiculeRecherche,
        quantite: body.quantite ? parseInt(body.quantite) : 1,
        budget: body.budget ? parseInt(body.budget) : null,
        message: body.message,
        statut: 'EN_ATTENTE',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Export request error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de la demande' },
      { status: 500 }
    )
  }
}
