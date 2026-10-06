'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { generateGeneralWhatsAppMessage } from '@/lib/whatsapp'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message')
      }

      alert('Message envoyé avec succès !')
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue lors de l\'envoi du message')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contactez-nous</h1>
          <p className="mt-4 text-lg text-gray-600">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 mt-1 text-purple-600" />
                  <div>
                    <p className="font-medium">Téléphones</p>
                    <div className="mt-1 space-y-1 text-sm text-gray-600">
                      <a href="tel:+22665924619" className="hover:text-purple-600">
                        +226 65 92 46 19
                      </a>
                      <br />
                      <a href="tel:+22601650766" className="hover:text-purple-600">
                        +226 01 65 07 66
                      </a>
                      <br />
                      <a href="tel:+22658371927" className="hover:text-purple-600">
                        +226 58 37 19 27
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 mt-1 text-purple-600" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a
                      href={generateGeneralWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-gray-600 hover:text-purple-600"
                    >
                      +226 65 92 46 19
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 mt-1 text-purple-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="mt-1 text-sm text-gray-600">
                      contact@yesauto.bf
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 mt-1 text-purple-600" />
                  <div>
                    <p className="font-medium">Localisation</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Ouagadougou, Burkina Faso
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Réseaux Sociaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/yes_auto11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-purple-600"
                  >
                    <span className="text-sm font-medium">Instagram</span>
                    <span className="text-sm text-gray-400">@yes_auto11</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@yes.auto1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-purple-600"
                  >
                    <span className="text-sm font-medium">TikTok</span>
                    <span className="text-sm text-gray-400">@yes.auto1</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1FFGbjiY1F/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-purple-600"
                  >
                    <span className="text-sm font-medium">Facebook</span>
                    <span className="text-sm text-gray-400">YES AUTO</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <a
                href={generateGeneralWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contactez-nous sur WhatsApp</span>
              </a>
              <a
                href="tel:+22665924619"
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-purple-700"
              >
                <Phone className="h-5 w-5" />
                <span>Appelez-nous</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Téléphone
                  </label>
                  <Input
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <Input
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <Textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
