'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plane } from 'lucide-react'

export default function ExportationPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    paysDestination: '',
    vehiculeRecherche: '',
    quantite: '',
    budget: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/exportation', {
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
        email: '',
        paysDestination: '',
        vehiculeRecherche: '',
        quantite: '',
        budget: '',
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
          <h1 className="text-4xl font-bold text-gray-900">Exportation de Véhicules</h1>
          <p className="mt-4 text-lg text-gray-600">
            Services d'exportation automobile vers l'international
          </p>
        </div>

        {/* Service Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-purple-600" />
              <span>Notre Service d'Exportation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              YES AUTO propose des services d'exportation de véhicules vers divers pays d'Afrique et d'ailleurs. 
              Nous facilitons toutes les démarches pour une exportation en toute sécurité.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Sélection de véhicules de qualité</li>
              <li>• Documentation complète</li>
              <li>• Gestion des formalités d'exportation</li>
              <li>• Organisation du transport maritime ou terrestre</li>
              <li>• Suivi de votre expédition</li>
              <li>• Assistance à destination</li>
            </ul>
          </CardContent>
        </Card>

        {/* Request Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Demande d'Exportation</CardTitle>
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

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Pays de destination *
                </label>
                <Input
                  required
                  placeholder="Ex: Côte d'Ivoire, Mali, Sénégal..."
                  value={formData.paysDestination}
                  onChange={(e) => setFormData({ ...formData, paysDestination: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Véhicule recherché
                </label>
                <Input
                  placeholder="Ex: Toyota Land Cruiser, Mercedes Classe G..."
                  value={formData.vehiculeRecherche}
                  onChange={(e) => setFormData({ ...formData, vehiculeRecherche: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Quantité
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 1"
                    value={formData.quantite}
                    onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Budget (FCFA)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 20000000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
      </div>
    </div>
  )
}
