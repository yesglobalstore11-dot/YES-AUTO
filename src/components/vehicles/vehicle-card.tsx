import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateVehicleWhatsAppMessage } from '@/lib/whatsapp'

type VehicleType = 'SUV' | 'BERLINE' | 'FOUR_X_FOUR' | 'PICK_UP' | 'UTILITAIRE' | 'CITADINE' | 'MONOSPACE' | 'AUTRE'
type VehicleStatus = 'DISPONIBLE' | 'VENDU' | 'LOUE' | 'RESERVE' | 'EN_ARRIVAGE'

interface VehicleCardProps {
  id: string
  slug: string
  marque: string
  modele: string
  annee: number
  prix: number
  prix_promotionnel?: number | null
  devise: string
  kilometrage?: number | null
  carburant: string
  boite_vitesse: string
  type: VehicleType
  statut: VehicleStatus
  vehicle_images?: any[]
  featured?: boolean
}

export function VehicleCard({
  id,
  slug,
  marque,
  modele,
  annee,
  prix,
  prix_promotionnel,
  devise,
  kilometrage,
  carburant,
  boite_vitesse,
  type,
  statut,
  vehicle_images,
  featured,
}: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const displayPrice = prix_promotionnel ? prix_promotionnel : prix
  const hasPromotion = prix_promotionnel && prix_promotionnel < prix
  const mainImage = vehicle_images?.find((img: any) => img.is_primary)?.url || vehicle_images?.[0]?.url

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case 'DISPONIBLE':
        return 'success'
      case 'VENDU':
        return 'danger'
      case 'LOUE':
        return 'warning'
      case 'RESERVE':
        return 'warning'
      case 'EN_ARRIVAGE':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <Link href={`/vehicules/${slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] bg-gray-200">
          {mainImage ? (
            <img
              src={mainImage}
              alt={`${marque} ${modele} ${annee}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <span className="text-4xl">🚗</span>
            </div>
          )}
          {featured && (
            <Badge className="absolute left-2 top-2" variant="default">
              À la une
            </Badge>
          )}
          {hasPromotion && (
            <Badge className="absolute right-2 top-2" variant="success">
              Promotion
            </Badge>
          )}
          <Badge className="absolute left-2 bottom-2" variant={getStatusColor(statut)}>
            {statut.replace('_', ' ')}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {marque} {modele}
          </h3>
          <p className="text-sm text-gray-600">{annee} • {type.replace('_', ' ')}</p>
          
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
            {kilometrage && (
              <span>{new Intl.NumberFormat('fr-FR').format(kilometrage)} km</span>
            )}
            <span>{carburant}</span>
            <span>{boite_vitesse}</span>
          </div>

          <div className="mt-4">
            {hasPromotion && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(prix)} {devise}
              </p>
            )}
            <p className="text-xl font-bold text-purple-600">
              {formatPrice(displayPrice)} {devise}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
