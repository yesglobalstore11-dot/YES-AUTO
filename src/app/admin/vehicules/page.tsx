import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/session'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Eye, Edit, Trash2 } from 'lucide-react'

export default async function AdminVehiclesPage() {
  const session = await requireAuth()

  if (!session) {
    redirect('/admin/login')
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Véhicules</h1>
            <p className="mt-2 text-gray-600">
              Gérez votre catalogue de véhicules
            </p>
          </div>
          <a
            href="/admin/vehicules/new"
            className="inline-flex items-center rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un véhicule
          </a>
        </div>

        {/* Vehicles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des véhicules ({vehicles?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {vehicles && vehicles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Véhicule
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Prix
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Promotion
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vehicles.map((vehicle: any) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {vehicle.marque} {vehicle.modele}
                            </p>
                            <p className="text-sm text-gray-600">
                              {vehicle.annee} • {vehicle.type}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {vehicle.prix?.toLocaleString()} {vehicle.devise}
                            </p>
                            {vehicle.prix_promotionnel && (
                              <p className="text-sm text-red-600 line-through">
                                {vehicle.prix_promotionnel?.toLocaleString()} {vehicle.devise}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              vehicle.statut === 'DISPONIBLE'
                                ? 'success'
                                : vehicle.statut === 'VENDU'
                                ? 'danger'
                                : 'default'
                            }
                          >
                            {vehicle.statut}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {vehicle.prix_promotionnel ? (
                            <Badge variant="success">Oui</Badge>
                          ) : (
                            <Badge variant="secondary">Non</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <a
                              href={`/vehicules/${vehicle.slug}`}
                              target="_blank"
                              className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm transition-colors hover:bg-gray-50"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                            <a
                              href={`/admin/vehicules/${vehicle.id}`}
                              className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm transition-colors hover:bg-gray-50"
                            >
                              <Edit className="h-4 w-4" />
                            </a>
                            <button className="inline-flex h-8 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm transition-colors hover:bg-gray-50">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600">
                  Aucun véhicule dans la base de données
                </p>
                <a
                  href="/admin/vehicules/new"
                  className="mt-4 inline-flex items-center rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter le premier véhicule
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
