import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Calendar, Gauge, Fuel, Settings } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select(`
      *,
      vehicle_images (*)
    `)
    .eq('slug', params.slug)
    .single()

  if (!vehicle) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <a href="/" className="hover:text-gray-900">
            Accueil
          </a>
          <span className="mx-2">/</span>
          <a href="/vehicules" className="hover:text-gray-900">
            Véhicules
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">
            {vehicle.marque} {vehicle.modele}
          </span>
        </nav>

        {/* Vehicle Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
              <img
                src={vehicle.vehicle_images?.[0]?.url || '/placeholder-vehicle.jpg'}
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {vehicle.vehicle_images?.slice(1).map((image: any) => (
                <div key={image.id} className="aspect-video overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={image.url}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <Badge variant="success">{vehicle.statut}</Badge>
              {vehicle.featured && (
                <Badge variant="default" className="ml-2">
                  Vedette
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.marque} {vehicle.modele}
            </h1>
            <p className="mt-2 text-2xl font-semibold text-purple-600">
              {vehicle.hide_price ? 'Prix sur demande' : `${vehicle.prix?.toLocaleString()} ${vehicle.devise}`}
            </p>
            {vehicle.prix_promotionnel && (
              <p className="mt-1 text-lg text-red-600 line-through">
                {vehicle.prix_promotionnel?.toLocaleString()} {vehicle.devise}
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{vehicle.annee}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Gauge className="mr-2 h-5 w-5" />
                <span>{vehicle.kilometrage?.toLocaleString()} km</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Fuel className="mr-2 h-5 w-5" />
                <span>{vehicle.carburant}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Settings className="mr-2 h-5 w-5" />
                <span>{vehicle.boite_vitesse}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{vehicle.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Équipement</h3>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-gray-600">
                <li>• Climatisation</li>
                <li>• GPS</li>
                <li>• Bluetooth</li>
                <li>• Caméra de recul</li>
                <li>• Régulateur de vitesse</li>
                <li>• Sièges chauffants</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`https://wa.me/22665924619?text=Bonjour, je suis intéressé par le ${vehicle.marque} ${vehicle.modele} (${vehicle.annee})`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contacter via WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-purple-600 px-6 py-3 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50"
              >
                <Mail className="mr-2 h-5 w-5" />
                Envoyer un message
              </a>
            </div>

            <div className="mt-6 flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{vehicle.localisation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
