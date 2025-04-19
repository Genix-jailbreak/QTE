import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, ChevronDown, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Products', 
      href: '/products',
      submenu: [
        { name: 'Wedding Cakes', href: '/products/wedding-cakes' },
        { name: 'Birthday Cakes', href: '/products/birthday-cakes' },
        { name: 'Custom Orders', href: '/products/custom' },
      ]
    },
    { name: 'Booking', href: '/booking' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Hire us', href: '/hire' },
    { 
      name: 'Training', 
      href: '/training',
      submenu: [
        { name: 'Apprenticeship', href: '/training/apprenticeship' },
        { name: 'Workshops', href: '/training/workshops' },
        { name: 'Career Opportunities', href: '/training/careers' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ]

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 transition-transform hover:scale-105"
            >
              <img
                className="h-14 w-auto"
                src="/images/qte-logo.jpg"
                alt="Queenz Treats"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`
                    flex items-center space-x-1 px-2 py-1 rounded-md
                    ${location.pathname === item.href 
                      ? 'text-purple-600' 
                      : 'text-gray-700 hover:text-purple-600'
                    } transition-colors duration-200
                  `}
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link 
              to="/cart" 
              className="relative group p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-purple-600" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* {user ? (
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Admin Login</span>
                </Link>
              </motion.div>
            )} */}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${location.pathname === item.href 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    } transition-colors duration-200
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}