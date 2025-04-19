import { motion } from 'framer-motion';
import { Book, Users, Award, Calendar, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Training() {
  const trainingPrograms = [
    {
      title: "Professional Apprenticeship",
      icon: GraduationCap,
      duration: "6 months",
      description: "Join our team as an apprentice and learn the art of baking from experienced professionals",
      features: [
        "Hands-on experience",
        "One-on-one mentoring",
        "Professional certification",
        "Possible employment opportunity",
      ],
      link: "/training/apprenticeship"
    },
    {
      title: "Weekend Workshops",
      icon: Calendar,
      duration: "2-3 days",
      description: "Intensive weekend workshops focusing on specific skills and techniques",
      features: [
        "Small group sessions",
        "Take-home materials",
        "Practice exercises",
        "Certificate of completion",
      ],
      link: "/training/workshops"
    },
    {
      title: "Career Development",
      icon: Award,
      duration: "Varies",
      description: "Professional development program for aspiring bakers and pastry chefs",
      features: [
        "Industry networking",
        "Business skills",
        "Advanced techniques",
        "Portfolio development",
      ],
      link: "/training/careers"
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
          <span className="text-purple-600 text-sm font-semibold tracking-wider uppercase">
            Learn & Grow With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Start Your Baking Journey
          </h1>
          <p className="text-xl text-gray-600">
            Join our professional training programs and transform your passion for baking into a rewarding career
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trainingPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <program.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {program.title}
                </h3>
                <div className="text-sm text-purple-600 font-medium mb-4">
                  Duration: {program.duration}
                </div>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={program.link}
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-purple-600 text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards your dream career in baking. Apply now for our training programs or schedule a consultation to learn more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/training/apply"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}