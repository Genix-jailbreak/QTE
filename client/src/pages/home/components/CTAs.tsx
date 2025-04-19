import { motion } from 'framer-motion';
import { Calendar, Phone, Cake, Star, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logEvent } from '../../../utils/analytics';
import { SEO } from '../../../components/common/SEO';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary';
import { launchConfetti } from '../../../utils/confetti';

export default function CTA() {
  const navigate = useNavigate();

  const features = [
    { icon: Cake, text: 'Custom Designs' },
    { icon: Star, text: 'Premium Quality' },
    { icon: Clock, text: 'Fast Response' },
  ];

  const handleBooking = () => {
    logEvent('CTA', 'Click', 'Book Consultation');
    launchConfetti();
    navigate('/booking');
  };

  const handleContact = () => {
    logEvent('CTA', 'Click', 'Contact Us');
    navigate('/contact');
  };

  return (
    <ErrorBoundary>
      <SEO 
        title="Book Your Consultation - Queenz Treats"
        description="Ready to create something special? Book a consultation with Queenz Treats today."
      />

      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 animate-pulse" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>

        <div className="container relative mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Events Into
                <span className="block text-yellow-300">Unforgettable Moments</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join our growing family of satisfied clients and experience the magic of our premium catering services.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <feature.icon className="w-5 h-5" />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBooking}
                  className="group w-full md:w-auto bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </motion.button>

                <span className="text-white/60 font-medium">or</span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContact}
                  className="group w-full md:w-auto border-2 border-white/80 hover:border-white px-8 py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}