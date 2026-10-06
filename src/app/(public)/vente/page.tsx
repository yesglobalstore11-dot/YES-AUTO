import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, CheckCircle } from 'lucide-react'

export default function VentePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Vente de Véhicules</h1>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez notre sélection de véhicules neufs et d'occasion
          </p>
        </div>

        {/* Services */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-purple-600" />
                <span>Véhicules Neufs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Véhicules neufs de dernière génération avec garantie constructeur.
              </p>
              <Link href="/vehicules">
                <Button>Voir les véhicules neufs</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-purple-600" />
                <span>Véhicules d'Occasion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Véhicules d'occasion rigoureusement sélectionnés et contrôlés.
              </p>
              <Link href="/vehicules">
                <Button>Voir les véhicules d'occasion</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Notre Processus d'Achat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Sélection</h3>
                  <p className="text-sm text-gray-600">Choisissez votre véhicule</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Contact</h3>
                  <p className="text-sm text-gray-600">Contactez-nous par WhatsApp ou téléphone</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Visite</h3>
                  <p className="text-sm text-gray-600">Venir voir le véhicule</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Achat</h3>
                  <p className="text-sm text-gray-600">Finalisez l'achat</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="rounded-lg bg-purple-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Prêt à trouver votre véhicule ?</h2>
          <p className="mb-6 text-purple-100">
            Contactez notre équipe commerciale pour plus d'informations
          </p>
          <Link href="/contact">
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
              Contacter YES AUTO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
