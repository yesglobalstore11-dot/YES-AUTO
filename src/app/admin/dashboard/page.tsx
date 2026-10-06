import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/session'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, MessageSquare, Calendar, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const session = await requireAuth()

  if (!session) {
    redirect('/admin/login')
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetch statistics
  const { count: totalVehicles } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })

  const { count: totalMessages } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })

  const { count: totalRequests } = await supabase
    .from('rental_requests')
    .select('*', { count: 'exact', head: true })

  const { count: activePromotions } = await supabase
    .from('promotions')
    .select('*', { count: 'exact', head: true })
    .eq('active', true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Vue d'ensemble de votre activité
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Véhicules
              </CardTitle>
              <Car className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalVehicles || 0}</div>
              <p className="mt-1 text-sm text-gray-600">Véhicules en catalogue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Messages
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalMessages || 0}</div>
              <p className="mt-1 text-sm text-gray-600">Messages reçus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Demandes
              </CardTitle>
              <Calendar className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalRequests || 0}</div>
              <p className="mt-1 text-sm text-gray-600">Demandes de location</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Promotions
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{activePromotions || 0}</div>
              <p className="mt-1 text-sm text-gray-600">Promotions actives</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Actions rapides</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/admin/vehicules"
              className="flex h-auto flex-col items-start space-y-2 rounded-lg bg-purple-600 p-6 text-white transition-colors hover:bg-purple-700"
            >
              <Car className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Gérer les véhicules</div>
                <div className="text-sm opacity-80">Ajouter, modifier, supprimer</div>
              </div>
            </a>

            <a
              href="/admin/demandes"
              className="flex h-auto flex-col items-start space-y-2 rounded-lg bg-purple-600 p-6 text-white transition-colors hover:bg-purple-700"
            >
              <MessageSquare className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Gérer les demandes</div>
                <div className="text-sm opacity-80">Messages, locations, imports</div>
              </div>
            </a>

            <a
              href="/vehicules"
              className="flex h-auto flex-col items-start space-y-2 rounded-lg bg-purple-600 p-6 text-white transition-colors hover:bg-purple-700"
            >
              <TrendingUp className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Voir le site</div>
                <div className="text-sm opacity-80">Aperçu public</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
