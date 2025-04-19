import { FaWhatsapp } from 'react-icons/fa'

export const WhatsappCTA = () => {
  const whatsappLink = `https://wa.link/0yd8rn`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center justify-center hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}