import { Instagram, Facebook, Mail, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Custom Cakes', href: '/services/custom-cakes' },
      { name: 'Wedding Cakes', href: '/services/wedding-cakes' },
      { name: 'Event Catering', href: '/services/catering' },
      { name: 'Booking', href: '/booking' },
    ],
  };

  return (
    <footer className="relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400"></div>

      <div className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="block">
                <img
                  src="/images/qte-logo.jpg"
                  alt="Queenz Treats"
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed">
                Exquisite cakes and desserts made for your most special moments. 
                Baked with love, always.
              </p>
              <div className="flex gap-4 pt-2">
                {[
                  { icon: Instagram, href: 'https://instagram.com/queenz.treats', color: 'hover:text-pink-600' },
                  { icon: Facebook, href: 'https://facebook.com/queenz.treats', color: 'hover:text-blue-600' },
                  { icon: Mail, href: 'mailto:queenz.treats@example.com', color: 'hover:text-red-600' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-gray-600 ${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-600">
                <p>123 Bakery Street</p>
                <p>Lagos, Nigeria</p>
                <p>Phone: +234 123 456 7890</p>
                <p>Email: info@queenztreats.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <div>
                &copy; {currentYear} Queenz Treats. All rights reserved.
              </div>
              
              {/* Attribution */}
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Want a website like this?</span>
                <a
                  href="https://linktr.ee/your_username" // Replace with your Linktree URL
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Contact me
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="px-1">•</span>
                <span className="inline-flex items-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-500" /> by Your Name
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}