import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Users, Award, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">À propos de YES AUTO</h1>
          <p className="mt-4 text-lg text-gray-600">
            Votre partenaire automobile de confiance au Burkina Faso
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Notre Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              YES AUTO s'engage à offrir des solutions automobiles complètes et de qualité 
              aux particuliers et entreprises du Burkina Faso. Notre mission est de rendre 
              l'achat, la location, l'importation et l'exportation de véhicules simples, 
              transparents et accessibles à tous.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Qualité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Véhicules sélectionnés et contrôlés avec rigueur
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Service Client</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Accompagnement personnalisé et réactif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Connaissance approfondie du marché automobile
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Confiance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Transparence et intégrité dans toutes nos transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Nos Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vente</h3>
                <p className="text-sm text-gray-600">
                  Vente de véhicules neufs et d'occasion rigoureusement sélectionnés 
                  et contrôlés pour garantir votre satisfaction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-sm text-gray-600">
                  Solutions de location courte et longue durée adaptées à vos besoins 
                  personnels ou professionnels.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Importation</h3>
                <p className="text-sm text-gray-600">
                  Service d'importation personnalisé pour trouver le véhicule de vos 
                  rêves à l'étranger et le faire livrer au Burkina Faso.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exportation</h3>
                <p className="text-sm text-gray-600">
                  Exportation de véhicules vers les pays d'Afrique et d'ailleurs avec 
                  une gestion complète des formalités.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle>Pourquoi choisir YES AUTO ?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Large sélection de véhicules de qualité</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Prix compétitifs et transparents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Service client disponible et réactif</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Expertise en importation et exportation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Solutions flexibles de location</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600">✓</span>
                <span>Accompagnement personnalisé</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
