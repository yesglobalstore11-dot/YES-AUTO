import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateGeneralWhatsAppMessage } from '@/lib/whatsapp'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi0yLTJjMCAwLTItMi0yLTRzMi0yIDItMiAyIDIgMiA0LTIgMi0yIDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            VOTRE PROCHAINE VOITURE
            <br />
            <span className="text-purple-400">COMMENCE ICI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
            Découvrez nos véhicules neufs et d'occasion ainsi que nos services de vente, location, 
            importation et exportation.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/vehicules"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-purple-600 px-8 text-lg font-semibold text-white transition-colors hover:bg-purple-700"
            >
              VOIR NOS VÉHICULES
            </Link>
            <a
              href={generateGeneralWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-purple-600 px-8 text-lg font-semibold text-purple-600 transition-colors hover:bg-purple-50"
            >
              CONTACTER YES AUTO
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
