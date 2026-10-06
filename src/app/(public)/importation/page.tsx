'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Globe } from 'lucide-react'

export default function ImportationPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    whatsapp: '',
    email: '',
    paysOrigine: '',
    marque: '',
    modele: '',
    anneeSouhaitee: '',
    budget: '',
    typeVehicule: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/importation', {
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
        paysOrigine: '',
        marque: '',
        modele: '',
        anneeSouhaitee: '',
        budget: '',
        typeVehicule: '',
        description: '',
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
          <h1 className="text-4xl font-bold text-gray-900">Importation de Véhicules</h1>
          <p className="mt-4 text-lg text-gray-600">
            Vous recherchez un véhicule spécifique à l'étranger ?
          </p>
        </div>

        {/* Service Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-purple-600" />
              <span>Notre Service d'Importation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Nous vous aidons à importer le véhicule de vos rêves depuis l'étranger. 
              Notre équipe s'occupe de toutes les démarches administratives et logistiques.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Recherche et sourcing de véhicules</li>
              <li>• Vérification de l'historique et de l'état</li>
              <li>• Négociation des prix</li>
              <li>• Gestion des formalités douanières</li>
              <li>• Transport et livraison</li>
              <li>• Suivi personnalisé de votre commande</li>
            </ul>
          </CardContent>
        </Card>

        {/* Request Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Demande d'Importation</CardTitle>
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
                  Pays d'origine souhaité *
                </label>
                <Select
                  required
                  value={formData.paysOrigine}
                  onChange={(e) => setFormData({ ...formData, paysOrigine: e.target.value })}
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="france">France</option>
                  <option value="allemagne">Allemagne</option>
                  <option value="belgique">Belgique</option>
                  <option value="etats-unis">États-Unis</option>
                  <option value="japon">Japon</option>
                  <option value="coree">Corée du Sud</option>
                  <option value="emirats">Émirats Arabes Unis</option>
                  <option value="autre">Autre</option>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Marque
                  </label>
                  <Input
                    value={formData.marque}
                    onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Modèle
                  </label>
                  <Input
                    value={formData.modele}
                    onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Année souhaitée
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 2024"
                    value={formData.anneeSouhaitee}
                    onChange={(e) => setFormData({ ...formData, anneeSouhaitee: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Budget (FCFA)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 15000000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type de véhicule
                </label>
                <Select
                  value={formData.typeVehicule}
                  onChange={(e) => setFormData({ ...formData, typeVehicule: e.target.value })}
                >
                  <option value="">Sélectionner un type</option>
                  <option value="suv">SUV</option>
                  <option value="berline">Berline</option>
                  <option value="4x4">4x4</option>
                  <option value="pick-up">Pick-up</option>
                  <option value="utilitaire">Utilitaire</option>
                  <option value="citadine">Citadine</option>
                  <option value="monospace">Monospace</option>
                  <option value="autre">Autre</option>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description du besoin
                </label>
                <Textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
