import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/session'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminRequestsPage() {
  const session = await requireAuth()

  if (!session) {
    redirect('/admin/login')
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: contactMessages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: rentalRequests } = await supabase
    .from('rental_requests')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: importRequests } = await supabase
    .from('import_requests')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: exportRequests } = await supabase
    .from('export_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Demandes</h1>
          <p className="mt-2 text-gray-600">
            Consultez et gérez toutes les demandes clients
          </p>
        </div>

        <div className="space-y-6">
          {/* Contact Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Messages de contact ({contactMessages?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {contactMessages && contactMessages.length > 0 ? (
                <div className="space-y-4">
                  {contactMessages.map((message: any) => (
                    <div key={message.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{message.nom}</p>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                        <Badge variant="default">{message.statut}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{message.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-gray-600">
                  Aucun message de contact
                </p>
              )}
            </CardContent>
          </Card>

          {/* Rental Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Demandes de location ({rentalRequests?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {rentalRequests && rentalRequests.length > 0 ? (
                <div className="space-y-4">
                  {rentalRequests.map((request: any) => (
                    <div key={request.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{request.nom}</p>
                          <p className="text-sm text-gray-600">{request.telephone}</p>
                        </div>
                        <Badge variant="default">{request.statut}</Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Dates: {request.date_debut} - {request.date_fin}</p>
                        <p>{request.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-gray-600">
                  Aucune demande de location
                </p>
              )}
            </CardContent>
          </Card>

          {/* Import Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Demandes d'importation ({importRequests?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {importRequests && importRequests.length > 0 ? (
                <div className="space-y-4">
                  {importRequests.map((request: any) => (
                    <div key={request.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{request.nom}</p>
                          <p className="text-sm text-gray-600">{request.pays_origine}</p>
                        </div>
                        <Badge variant="default">{request.statut}</Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{request.marque} {request.modele} ({request.annee_souhaitee})</p>
                        <p>Budget: {request.budget} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-gray-600">
                  Aucune demande d'importation
                </p>
              )}
            </CardContent>
          </Card>

          {/* Export Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Demandes d'exportation ({exportRequests?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {exportRequests && exportRequests.length > 0 ? (
                <div className="space-y-4">
                  {exportRequests.map((request: any) => (
                    <div key={request.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{request.nom}</p>
                          <p className="text-sm text-gray-600">{request.pays_destination}</p>
                        </div>
                        <Badge variant="default">{request.statut}</Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{request.vehicule_recherche}</p>
                        <p>Quantité: {request.quantite} • Budget: {request.budget} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-gray-600">
                  Aucune demande d'exportation
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
