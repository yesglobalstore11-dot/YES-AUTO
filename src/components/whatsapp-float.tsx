'use client'

import { MessageCircle } from 'lucide-react'
import { generateGeneralWhatsAppMessage } from '@/lib/whatsapp'

export function WhatsAppFloat() {
  return (
    <a
      href={generateGeneralWhatsAppMessage()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
