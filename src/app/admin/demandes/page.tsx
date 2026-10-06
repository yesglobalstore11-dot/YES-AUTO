'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/server'

type ContactMessage = {
  id: string
  nom: string
  email: string
  telephone: string
  sujet: string
  message: string
  created_at: string
}

type RentalRequest = {
  id: string
  nom: string
  telephone: string
  whatsapp: string
  email: string
  vehicule: string
  date_debut: string
  date_fin: string
  message: string
  created_at: string
}

type ImportRequest = {
  id: string
  nom: string
  telephone: string
  whatsapp: string
  email: string
  pays_origine: string
  marque: string
  modele: string
  annee_souhaitee: string
  budget: string
  type_vehicule: string
  description: string
  created_at: string
}

type ExportRequest = {
  id: string
  nom: string
  telephone: string
  email: string
  pays_destination: string
  vehicule_recherche: string
  quantite: string
  budget: string
  message: string
  created_at: string
}

export default function DemandesPage() {
  const [loading, setLoading] = useState(true)
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([])
  const [importRequests, setImportRequests] = useState<ImportRequest[]>([])
  const [exportRequests, setExportRequests] = useState<ExportRequest[]>([])

  useEffect(() => {
    fetchAllRequests()
  }, [])

  async function fetchAllRequests() {
    try {
      const supabase = await createClient()

      const [contactsRes, rentalsRes, importsRes, exportsRes] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('rental_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('import_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('export_requests').select('*').order('created_at', { ascending: false }),
      ])

      if (contactsRes.data) setContactMessages(contactsRes.data)
      if (rentalsRes.data) setRentalRequests(rentalsRes.data)
      if (importsRes.data) setImportRequests(importsRes.data)
      if (exportsRes.data) setExportRequests(exportsRes.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Demandes Clients</h1>
          <p className="mt-2 text-gray-600">
            Gérez toutes les demandes de vos clients
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Messages de contact</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">{contactMessages.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Demandes de location</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">{rentalRequests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Demandes d'import</p>
              <p className="mt-2 text-3xl font-bold text-green-600">{importRequests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Demandes d'export</p>
              <p className="mt-2 text-3xl font-bold text-orange-600">{exportRequests.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contact">
          <TabsList className="mb-6">
            <TabsTrigger value="contact">Contact ({contactMessages.length})</TabsTrigger>
            <TabsTrigger value="location">Location ({rentalRequests.length})</TabsTrigger>
            <TabsTrigger value="import">Import ({importRequests.length})</TabsTrigger>
            <TabsTrigger value="export">Export ({exportRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Messages de Contact</CardTitle>
              </CardHeader>
              <CardContent>
                {contactMessages.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucun message de contact</p>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map((msg) => (
                      <div key={msg.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{msg.nom}</h3>
                          <span className="text-sm text-gray-500">{formatDate(msg.created_at)}</span>
                        </div>
                        <div className="mb-2 space-y-1 text-sm text-gray-600">
                          <p><strong>Email:</strong> {msg.email}</p>
                          <p><strong>Téléphone:</strong> {msg.telephone}</p>
                          <p><strong>Sujet:</strong> {msg.sujet}</p>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de Location</CardTitle>
              </CardHeader>
              <CardContent>
                {rentalRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune demande de location</p>
                ) : (
                  <div className="space-y-4">
                    {rentalRequests.map((req) => (
                      <div key={req.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{req.nom}</h3>
                          <span className="text-sm text-gray-500">{formatDate(req.created_at)}</span>
                        </div>
                        <div className="mb-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p><strong>Téléphone:</strong> {req.telephone}</p>
                          <p><strong>WhatsApp:</strong> {req.whatsapp}</p>
                          <p><strong>Email:</strong> {req.email}</p>
                          <p><strong>Véhicule:</strong> {req.vehicule}</p>
                          <p><strong>Date début:</strong> {new Date(req.date_debut).toLocaleDateString('fr-FR')}</p>
                          <p><strong>Date fin:</strong> {new Date(req.date_fin).toLocaleDateString('fr-FR')}</p>
                        </div>
                        {req.message && <p className="text-sm text-gray-700">{req.message}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'Importation</CardTitle>
              </CardHeader>
              <CardContent>
                {importRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune demande d'importation</p>
                ) : (
                  <div className="space-y-4">
                    {importRequests.map((req) => (
                      <div key={req.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{req.nom}</h3>
                          <span className="text-sm text-gray-500">{formatDate(req.created_at)}</span>
                        </div>
                        <div className="mb-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p><strong>Téléphone:</strong> {req.telephone}</p>
                          <p><strong>WhatsApp:</strong> {req.whatsapp}</p>
                          <p><strong>Email:</strong> {req.email}</p>
                          <p><strong>Pays origine:</strong> {req.pays_origine}</p>
                          <p><strong>Marque:</strong> {req.marque}</p>
                          <p><strong>Modèle:</strong> {req.modele}</p>
                          <p><strong>Année:</strong> {req.annee_souhaitee}</p>
                          <p><strong>Budget:</strong> {req.budget} FCFA</p>
                          <p><strong>Type:</strong> {req.type_vehicule}</p>
                        </div>
                        {req.description && <p className="text-sm text-gray-700">{req.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'Exportation</CardTitle>
              </CardHeader>
              <CardContent>
                {exportRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune demande d'exportation</p>
                ) : (
                  <div className="space-y-4">
                    {exportRequests.map((req) => (
                      <div key={req.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{req.nom}</h3>
                          <span className="text-sm text-gray-500">{formatDate(req.created_at)}</span>
                        </div>
                        <div className="mb-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p><strong>Téléphone:</strong> {req.telephone}</p>
                          <p><strong>Email:</strong> {req.email}</p>
                          <p><strong>Pays destination:</strong> {req.pays_destination}</p>
                          <p><strong>Véhicule:</strong> {req.vehicule_recherche}</p>
                          <p><strong>Quantité:</strong> {req.quantite}</p>
                          <p><strong>Budget:</strong> {req.budget} FCFA</p>
                        </div>
                        {req.message && <p className="text-sm text-gray-700">{req.message}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
