'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateGeneralWhatsAppMessage } from '@/lib/whatsapp'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Véhicules', href: '/vehicules' },
    { name: 'Vente', href: '/vente' },
    { name: 'Location', href: '/location' },
    { name: 'Importation', href: '/importation' },
    { name: 'Exportation', href: '/exportation' },
    { name: 'Promotions', href: '/promotions' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
              <span className="text-xl font-bold text-white">YA</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">YES AUTO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href={generateGeneralWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              <Phone className="h-4 w-4" />
              <span>+226 01 65 07 66</span>
            </a>
            <a
              href={generateGeneralWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <a
                href="tel:+22601650766"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <Phone className="h-4 w-4" />
                <span>+226 01 65 07 66</span>
              </a>
              <a
                href={generateGeneralWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
