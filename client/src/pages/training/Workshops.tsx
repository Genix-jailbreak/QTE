import { motion } from 'framer-motion';
import { Calendar, Clock, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Workshops() {
  const workshops = [
    {
      title: "Wedding Cake Masterclass",
      duration: "3 days",
      price: 499,
      maxParticipants: 8,
      dates: ["May 15-17", "August 21-23"],
      description: "Learn professional techniques for creating stunning wedding cakes",
      topics: [
        "Fondant work",
        "Sugar flowers",
        "Tiered cake construction",
        "Advanced decorating"
      ]
    },
    {
      title: "Artisan Bread Making",
      duration: "2 days",
      price: 299,
      maxParticipants: 10,
      dates: ["June 10-11", "September 5-6"],
      description: "Master the art of baking authentic artisan breads",
      topics: [
        "Sourdough starters",
        "Hand-kneading techniques",
        "Scoring patterns",
        "Different bread types"
      ]
    },
    {
      title: "French Pastries",
      duration: "2 days",
      price: 399,
      maxParticipants: 8,
      dates: ["July 8-9", "October 14-15"],
      description: "Create classic French pastries like a professional",
      topics: [
        "Croissants",
        "Macarons",
        "Éclairs",
        "Petit fours"
      ]
    }
  ];

  return (
    <main className="bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Baking Workshops
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Intensive hands-on workshops designed to elevate your baking skills
            </p>
          </div>

          {/* Workshops Grid */}
          <div className="space-y-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {workshop.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {workshop.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {workshop.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                          <span className="text-sm text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/training/workshops/${workshop.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="md:w-1/3 bg-purple-50 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600">{workshop.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600">${workshop.price}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600">Max {workshop.maxParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600">
                          {workshop.dates.join(" | ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-purple-600 text-white rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to Enhance Your Skills?
            </h2>
            <p className="text-purple-100 mb-6">
              Join our upcoming workshops and learn from industry professionals
            </p>
            <Link
              to="/training/workshops/register"
              className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              Register Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}