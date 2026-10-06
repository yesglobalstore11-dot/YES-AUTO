import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                <span className="text-lg font-bold text-white">YA</span>
              </div>
              <span className="text-xl font-bold">YES AUTO</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre partenaire automobile de confiance.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/vente" className="transition-colors hover:text-white">
                  Vente
                </Link>
              </li>
              <li>
                <Link href="/location" className="transition-colors hover:text-white">
                  Location
                </Link>
              </li>
              <li>
                <Link href="/importation" className="transition-colors hover:text-white">
                  Importation
                </Link>
              </li>
              <li>
                <Link href="/exportation" className="transition-colors hover:text-white">
                  Exportation
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/vehicules" className="transition-colors hover:text-white">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="transition-colors hover:text-white">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="transition-colors hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+22665924619" className="transition-colors hover:text-white">
                    +226 65 92 46 19
                  </a>
                  <br />
                  <a href="tel:+22601650766" className="transition-colors hover:text-white">
                    +226 01 65 07 66
                  </a>
                  <br />
                  <a href="tel:+22658371927" className="transition-colors hover:text-white">
                    +226 58 37 19 27
                  </a>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.instagram.com/yes_auto11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@yes.auto1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white"
                aria-label="TikTok"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/share/1FFGbjiY1F/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} YES AUTO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
