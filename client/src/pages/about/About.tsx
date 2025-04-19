import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, Calendar, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://instagram.com/queenz.treats',
      label: 'Follow us on Instagram',
      color: 'hover:text-pink-600'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/queenz.treats',
      label: 'Connect on Facebook',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Mail, 
      href: 'mailto:info@queenztreats.com',
      label: 'Email us',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <main className="bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Crafting Sweet Memories
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to Queenz Treats, where passion meets perfection in every creation
            </motion.p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src="/images/about/store-front.jpg"
              alt="Queenz Treats Store"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2023 by Olubukola Awosope, Queenz Treats began as a small home-based bakery 
                driven by a passion for creating extraordinary desserts. What started as a 
                dream has blossomed into Lagos's premier destination for custom cakes and 
                event planning.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every creation that leaves our kitchen carries with it the essence of our 
                dedication to quality and creativity. We believe that every celebration 
                deserves something special, something unforgettable.
              </p>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Quality First",
                  description: "Premium ingredients and meticulous attention to detail in every creation"
                },
                {
                  title: "Customer Joy",
                  description: "Your satisfaction and happiness are at the heart of everything we do"
                },
                {
                  title: "Innovation",
                  description: "Constantly exploring new designs and flavors to delight your senses"
                },
                {
                  title: "Community",
                  description: "Proud to be part of our local community, creating moments of joy"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-purple-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Let's Create Together</h2>
            <p className="text-xl text-gray-600">
              Ready to bring your sweet dreams to life? Connect with us!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md ${social.color} transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span>{social.label}</span>
                </motion.a>
              ))}
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/booking"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Consultation</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}