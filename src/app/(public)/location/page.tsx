'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock } from 'lucide-react'

export default function LocationPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    whatsapp: '',
    email: '',
    vehicule: '',
    dateDebut: '',
    dateFin: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande')
      }

      alert('Demande envoyée avec succès !')
      setFormData({
        nom: '',
        telephone: '',
        whatsapp: '',
        email: '',
        vehicule: '',
        dateDebut: '',
        dateFin: '',
        message: '',
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue lors de l\'envoi de la demande')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Location de Véhicules</h1>
          <p className="mt-4 text-lg text-gray-600">
            Louez le véhicule idéal pour vos besoins
          </p>
        </div>

        {/* Services */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span>Location Courte Durée</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Location à la journée, à la semaine ou au mois pour vos déplacements personnels ou professionnels.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Véhicules récents et bien entretenus</li>
                <li>• Assurances incluses</li>
                <li>• Assistance routière 24/7</li>
                <li>• Kilométrage illimité (option)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>Location Longue Durée</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Solutions de location longue durée pour entreprises et particuliers.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tarifs préférentiels</li>
                <li>• Maintenance incluse</li>
                <li>• Renouvellement de véhicule</li>
                <li>• Facturation mensuelle</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Request Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Demande de Réservation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nom *
                  </label>
                  <Input
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Téléphone *
                  </label>
                  <Input
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type de véhicule souhaité
                </label>
                <Input
                  placeholder="Ex: SUV, Berline, etc."
                  value={formData.vehicule}
                  onChange={(e) => setFormData({ ...formData, vehicule: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date de début *
                  </label>
                  <Input
                    type="date"
                    required
                    value={formData.dateDebut}
                    onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date de fin *
                  </label>
                  <Input
                    type="date"
                    required
                    value={formData.dateFin}
                    onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full">
                Envoyer ma demande
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-12 rounded-lg bg-blue-50 p-6">
          <p className="text-sm text-blue-800">
            <strong>Note :</strong> Cette demande ne constitue pas une réservation confirmée. 
            Notre équipe vous contactera pour finaliser votre réservation selon les disponibilités.
          </p>
        </div>
      </div>
    </div>
  )
}
