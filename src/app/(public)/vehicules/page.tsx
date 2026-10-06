'use client'

import { useState, useEffect } from 'react'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    marque: '',
    type: '',
    carburant: '',
    boiteVitesse: '',
    prixMin: '',
    prixMax: '',
    anneeMin: '',
  })

  const marques = ['Toyota', 'Honda', 'Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Peugeot', 'Renault', 'Ford', 'Hyundai', 'Kia']
  const types = ['SUV', 'Berline', '4x4', 'Pick-up', 'Utilitaire', 'Citadine', 'Monospace', 'Autre']
  const carburants = ['Essence', 'Diesel', 'Hybride', 'Électrique']
  const boites = ['Automatique', 'Manuelle', 'Autre']

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles')
      const data = await response.json()
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase()
    return (
      vehicle.marque.toLowerCase().includes(searchLower) ||
      vehicle.modele.toLowerCase().includes(searchLower) ||
      vehicle.type?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nos Véhicules</h1>
          <p className="mt-2 text-gray-600">
            Découvrez notre catalogue de véhicules neufs et d'occasion
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par marque, modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters Toggle */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Marque
                </label>
                <Select
                  value={filters.marque}
                  onChange={(e) => setFilters({ ...filters, marque: e.target.value })}
                >
                  <option value="">Toutes</option>
                  {marques.map((marque) => (
                    <option key={marque} value={marque}>
                      {marque}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type
                </label>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">Tous</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Carburant
                </label>
                <Select
                  value={filters.carburant}
                  onChange={(e) => setFilters({ ...filters, carburant: e.target.value })}
                >
                  <option value="">Tous</option>
                  {carburants.map((carburant) => (
                    <option key={carburant} value={carburant}>
                      {carburant}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Boîte de vitesses
                </label>
                <Select
                  value={filters.boiteVitesse}
                  onChange={(e) => setFilters({ ...filters, boiteVitesse: e.target.value })}
                >
                  <option value="">Toutes</option>
                  {boites.map((boite) => (
                    <option key={boite} value={boite}>
                      {boite}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Prix minimum (FCFA)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 5000000"
                  value={filters.prixMin}
                  onChange={(e) => setFilters({ ...filters, prixMin: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Prix maximum (FCFA)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 20000000"
                  value={filters.prixMax}
                  onChange={(e) => setFilters({ ...filters, prixMax: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Année minimum
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 2020"
                  value={filters.anneeMin}
                  onChange={(e) => setFilters({ ...filters, anneeMin: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Année maximum
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 2024"
                  value={filters.anneeMax}
                  onChange={(e) => setFilters({ ...filters, anneeMax: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={() => setFilters({
                marque: '',
                type: '',
                carburant: '',
                boiteVitesse: '',
                prixMin: '',
                prixMax: '',
                anneeMin: '',
                anneeMax: '',
              })}>
                Réinitialiser
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 text-sm text-gray-600">
          {vehicles.length} véhicule(s) trouvé(s)
        </div>

        {/* Vehicle Grid */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-lg text-gray-600">
              Aucun véhicule trouvé avec ces critères.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
