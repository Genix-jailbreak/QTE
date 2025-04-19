import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: "🎂",
      title: "Custom Cakes",
      description: "Personalized cakes for any occasion, designed to your specifications with premium ingredients and artistic flair.",
      link: "/services/custom-cakes"
    },
    {
      icon: "🍽️",
      title: "Full-Service Catering",
      description: "Complete dining solutions for your events, from menu planning to execution, ensuring a memorable culinary experience.",
      link: "/services/catering"
    },
    {
      icon: "✨",
      title: "Event Planning",
      description: "End-to-end event management services, turning your vision into reality with meticulous attention to detail.",
      link: "/services/event-planning"
    },
    {
      icon: "🍪",
      title: "Baking Classes",
      description: "Hands-on baking workshops for all skill levels, led by experienced chefs to enhance your culinary skills.",
      link: "/services/baking-classes"
    },
    {
      icon: "🎉",
      title: "Rentals",
      description: "A wide range of event rentals including tables, chairs, linens, and decor to create the perfect ambiance.",
      link: "/services/rentals"
    },
    // {
    //   icon: "🍰",
    //   title: "Dessert Tables",
    //   description: "Stunning dessert displays that combine taste and aesthetics, perfect for making your event extra special.",
    //   link: "/services/dessert-tables"
    // },
    {
      icon: "🥂",
      title: "Corporate Catering",
      description: "Professional catering solutions tailored for business events, meetings, and corporate functions.",
      link: "/services/corporate"
    },
    // {
    //   icon: "🎶",
    //   title: "Entertainment Booking",
    //   description: "Curated entertainment options to elevate your event, from live music to professional DJs and performers.",
    //   link: "/services/entertainment"
    // }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-70"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-purple-600 text-sm font-semibold tracking-wider uppercase">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive event solutions tailored to create unforgettable experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl"></div>
              
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 line-clamp-2">
                {service.description}
              </p>
              
              <motion.a
                href={service.link}
                className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}