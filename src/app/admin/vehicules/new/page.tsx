'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { ImageUpload } from '@/components/ui/image-upload'

export default function NewVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    slug: '',
    annee: '',
    prix: '',
    prix_promotionnel: '',
    devise: 'FCFA',
    kilometrage: '',
    carburant: '',
    boite_vitesse: '',
    moteur: '',
    puissance: '',
    couleur: '',
    nombre_places: '',
    type: '',
    etat: '',
    statut: 'DISPONIBLE',
    localisation: '',
    description: '',
    featured: false,
    hide_price: false,
  })
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const vehicleData = {
        ...formData,
        annee: parseInt(formData.annee),
        prix: parseFloat(formData.prix),
        prix_promotionnel: formData.prix_promotionnel ? parseFloat(formData.prix_promotionnel) : null,
        kilometrage: formData.kilometrage ? parseInt(formData.kilometrage) : null,
        puissance: formData.puissance ? parseInt(formData.puissance) : null,
        nombre_places: formData.nombre_places ? parseInt(formData.nombre_places) : null,
        images: images,
      }

      const response = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création du véhicule')
      }

      router.push('/admin/vehicules')
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = `${formData.marque.toLowerCase().replace(/\s+/g, '-')}-${formData.modele.toLowerCase().replace(/\s+/g, '-')}-${formData.annee}`
    setFormData({ ...formData, slug })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ajouter un véhicule</h1>
          <p className="mt-2 text-gray-600">
            Remplissez les informations pour ajouter un nouveau véhicule
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Marque *
                  </label>
                  <Input
                    required
                    value={formData.marque}
                    onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Modèle *
                  </label>
                  <Input
                    required
                    value={formData.modele}
                    onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Slug *
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="toyota-corolla-2024"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateSlug}
                    >
                      Générer
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Année *
                  </label>
                  <Input
                    required
                    type="number"
                    value={formData.annee}
                    onChange={(e) => setFormData({ ...formData, annee: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Prix *
                  </label>
                  <Input
                    required
                    type="number"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Prix promotionnel
                  </label>
                  <Input
                    type="number"
                    value={formData.prix_promotionnel}
                    onChange={(e) => setFormData({ ...formData, prix_promotionnel: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Devise
                  </label>
                  <Select
                    value={formData.devise}
                    onChange={(e) => setFormData({ ...formData, devise: e.target.value })}
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Kilométrage
                  </label>
                  <Input
                    type="number"
                    value={formData.kilometrage}
                    onChange={(e) => setFormData({ ...formData, kilometrage: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <Select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Sélectionner</option>
                    <option value="SUV">SUV</option>
                    <option value="BERLINE">Berline</option>
                    <option value="FOUR_X_FOUR">4x4</option>
                    <option value="PICK_UP">Pick-up</option>
                    <option value="UTILITAIRE">Utilitaire</option>
                    <option value="CITADINE">Citadine</option>
                    <option value="MONOSPACE">Monospace</option>
                    <option value="AUTRE">Autre</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Carburant
                  </label>
                  <Select
                    required
                    value={formData.carburant}
                    onChange={(e) => setFormData({ ...formData, carburant: e.target.value })}
                  >
                    <option value="">Sélectionner</option>
                    <option value="ESSENCE">Essence</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="HYBRIDE">Hybride</option>
                    <option value="ELECTRIQUE">Électrique</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Boîte de vitesses
                  </label>
                  <Select
                    required
                    value={formData.boite_vitesse}
                    onChange={(e) => setFormData({ ...formData, boite_vitesse: e.target.value })}
                  >
                    <option value="">Sélectionner</option>
                    <option value="AUTOMATIQUE">Automatique</option>
                    <option value="MANUELLE">Manuelle</option>
                    <option value="AUTRE">Autre</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <Select
                    required
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                  >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="VENDU">Vendu</option>
                    <option value="LOUE">Loué</option>
                    <option value="RESERVE">Réservé</option>
                    <option value="EN_ARRIVAGE">En arrivage</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Moteur
                  </label>
                  <Input
                    value={formData.moteur}
                    onChange={(e) => setFormData({ ...formData, moteur: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Puissance (ch)
                  </label>
                  <Input
                    type="number"
                    value={formData.puissance}
                    onChange={(e) => setFormData({ ...formData, puissance: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Couleur
                  </label>
                  <Input
                    value={formData.couleur}
                    onChange={(e) => setFormData({ ...formData, couleur: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre de places
                  </label>
                  <Input
                    type="number"
                    value={formData.nombre_places}
                    onChange={(e) => setFormData({ ...formData, nombre_places: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Localisation
                  </label>
                  <Input
                    value={formData.localisation}
                    onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  État
                </label>
                <Input
                  required
                  value={formData.etat}
                  onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
                  placeholder="Ex: Excellent, Bon, Acceptable"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Véhicule à la une</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.hide_price}
                    onChange={(e) => setFormData({ ...formData, hide_price: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Masquer le prix</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload onImagesChange={setImages} maxImages={10} />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Création...' : 'Créer le véhicule'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
