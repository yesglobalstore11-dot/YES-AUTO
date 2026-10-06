import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Calendar, Globe, Plane } from 'lucide-react'

const services = [
  {
    title: 'VENTE',
    description: 'Vente de véhicules neufs et d\'occasion.',
    icon: Car,
    href: '/vente',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'LOCATION',
    description: 'Location courte et longue durée.',
    icon: Calendar,
    href: '/location',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'IMPORTATION',
    description: 'Importation de véhicules depuis l\'étranger.',
    icon: Globe,
    href: '/importation',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'EXPORTATION',
    description: 'Exportation de véhicules vers l\'international.',
    icon: Plane,
    href: '/exportation',
    color: 'bg-orange-100 text-orange-600',
  },
]

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Des solutions automobiles complètes pour tous vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link key={service.title} href={service.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                      En savoir plus →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
