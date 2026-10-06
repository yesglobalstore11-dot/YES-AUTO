import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function PromotionsPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: vehicles } = await supabase
    .from('vehicles')
    .select(`
      *,
      vehicle_images (*)
    `)
    .not('prix_promotionnel', 'is', null)
    .eq('statut', 'DISPONIBLE')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
          <p className="mt-2 text-gray-600">
            Profitez de nos offres spéciales sur une sélection de véhicules
          </p>
        </div>

        {/* Vehicles Grid */}
        {vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle: any) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              Aucune promotion en cours pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
