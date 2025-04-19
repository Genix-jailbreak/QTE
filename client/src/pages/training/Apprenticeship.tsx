import { motion } from 'framer-motion';
import { Clock, Book, Award, Users, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Apprenticeship() {
  const apprenticeshipDetails = {
    duration: "6 months",
    startDates: ["January", "June"],
    cost: "Paid apprenticeship",
    requirements: [
      "Minimum age: 18 years",
      "High school diploma or equivalent",
      "Passion for baking",
      "Basic math skills",
      "Physical stamina",
      "Team player attitude"
    ],
    curriculum: [
      "Basic baking techniques",
      "Cake decorating",
      "Pastry fundamentals",
      "Food safety & hygiene",
      "Kitchen management",
      "Customer service"
    ]
  };

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
              Professional Apprenticeship Program
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your journey to becoming a professional baker with our 
              comprehensive apprenticeship program.
            </p>
          </div>

          {/* Program Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Program Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">Duration: {apprenticeshipDetails.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">Start Dates: {apprenticeshipDetails.startDates.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">Cost: {apprenticeshipDetails.cost}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-3">
                {apprenticeshipDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Curriculum Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {apprenticeshipDetails.curriculum.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">
                    Module {index + 1}
                  </h3>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link
              to="/training/apply"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}