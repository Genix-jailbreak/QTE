import { motion } from 'framer-motion';
import { Briefcase, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  const positions = [
    {
      title: "Junior Baker",
      type: "Full-time",
      location: "Lagos",
      experience: "1-2 years",
      responsibilities: [
        "Assist in daily baking operations",
        "Follow recipes and procedures",
        "Maintain cleanliness and organization",
        "Help with inventory management"
      ],
      requirements: [
        "Baking certification or equivalent experience",
        "Strong attention to detail",
        "Team player mentality",
        "Flexible schedule availability"
      ]
    },
    {
      title: "Pastry Chef Assistant",
      type: "Full-time",
      location: "Lagos",
      experience: "2-3 years",
      responsibilities: [
        "Support head pastry chef",
        "Prepare desserts and pastries",
        "Quality control",
        "Train junior staff"
      ],
      requirements: [
        "Culinary school degree preferred",
        "Experience in high-volume bakery",
        "Leadership qualities",
        "Creative mindset"
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
              Career Opportunities
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our team of passionate baking professionals and grow your career
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-8 mb-16">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {position.title}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{position.experience}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/careers/apply/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {position.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-purple-600 text-white rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">
              Why Work With Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Professional Development",
                "Competitive Salary",
                "Health Benefits",
                "Paid Time Off",
                "Team Events",
                "Growth Opportunities"
              ].map((benefit, index) => (
                <div
                  key={benefit}
                  className="bg-purple-500/50 rounded-lg p-4"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}