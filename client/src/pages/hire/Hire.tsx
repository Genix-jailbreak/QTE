import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Utensils, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  minGuests?: number;
  basePrice: number;
}

export default function Hire() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: ServiceOption[] = [
    {
      id: 'full-service',
      title: 'Full Service Catering',
      description: 'Complete catering solution with staff, setup, and cleanup',
      icon: Utensils,
      features: [
        'Professional service staff',
        'Complete setup and cleanup',
        'Premium dinnerware and equipment',
        'Custom menu planning',
        'Bar service available',
      ],
      minGuests: 50,
      basePrice: 45
    },
    {
      id: 'drop-off',
      title: 'Drop-off Catering',
      description: 'Perfect for office meetings and small gatherings',
      icon: Clock,
      features: [
        'Convenient delivery',
        'Disposable serving ware',
        'Setup included',
        'Variety of menu options',
        'Minimum 15 people',
      ],
      minGuests: 15,
      basePrice: 25
    },
    {
      id: 'event-planning',
      title: 'Event Planning',
      description: 'Full-scale event planning and coordination services',
      icon: Calendar,
      features: [
        'Venue selection assistance',
        'Vendor coordination',
        'Timeline planning',
        'Day-of coordination',
        'Custom event design',
      ],
      basePrice: 1500
    }
  ];

  return (
    <main className="bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let Us Cater Your Next Event
          </h1>
          <p className="text-xl text-gray-600">
            From intimate gatherings to grand celebrations, we bring exceptional 
            catering services to make your event unforgettable.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`
                relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl 
                transition-all duration-300 cursor-pointer
                ${selectedService === service.id ? 'ring-2 ring-purple-500' : ''}
              `}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="absolute top-4 right-4">
                <service.icon className="w-6 h-6 text-purple-500" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    Starting at
                    <span className="text-xl font-bold text-purple-600 ml-2">
                      ${service.basePrice}
                    </span>
                    {service.minGuests ? (
                      <span className="text-sm text-gray-500">
                        /person
                      </span>
                    ) : null}
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Request a Quote
          </h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Details
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell us about your event..."
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Request
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}