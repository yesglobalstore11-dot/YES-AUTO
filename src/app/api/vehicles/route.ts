import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    
    const { searchParams } = new URL(request.url)
    const marque = searchParams.get('marque')
    const type = searchParams.get('type')
    const carburant = searchParams.get('carburant')
    const statut = searchParams.get('statut') || 'DISPONIBLE'

    let query = supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_images (*)
      `)
      .eq('statut', statut)

    if (marque) {
      query = query.eq('marque', marque)
    }
    if (type) {
      query = query.eq('type', type)
    }
    if (carburant) {
      query = query.eq('carburant', carburant)
    }

    const { data: vehicles, error } = await query.order('created_at', { ascending: false })

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
