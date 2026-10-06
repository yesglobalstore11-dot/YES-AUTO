const WHATSAPP_NUMBER = '22665924619'

export function generateWhatsAppMessage(message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function generateVehicleWhatsAppMessage(
  marque: string,
  modele: string,
  annee: number,
  prix: string
) {
  const message = `Bonjour YES AUTO, je suis intéressé par le véhicule ${marque} ${modele} ${annee} affiché à ${prix}. Je souhaite avoir plus d'informations.`
  return generateWhatsAppMessage(message)
}

export function generateGeneralWhatsAppMessage() {
  const message = 'Bonjour YES AUTO, je souhaite avoir des informations sur vos véhicules.'
  return generateWhatsAppMessage(message)
}
