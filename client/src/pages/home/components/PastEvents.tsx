import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Camera } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  description: string;
  images: string[];
  category: string;
}

export default function PastEvents() {
  const events: Event[] = [
    {
      id: 1,
      title: "Royal Wedding Reception",
      date: "March 15, 2024",
      location: "Grand Ballroom, Luxury Hotel",
      attendees: 350,
      description: "An elegant wedding celebration featuring our premium catering service and custom-designed wedding cake.",
      images: ["/images/events/wedding-1.jpg", "/images/events/wedding-2.jpg"],
      category: "Wedding"
    },
    {
      id: 2,
      title: "Corporate Annual Gala",
      date: "February 28, 2024",
      location: "Business Convention Center",
      attendees: 500,
      description: "A sophisticated evening of fine dining and entertainment for a leading tech company.",
      images: ["/images/events/corporate-1.jpg", "/images/events/corporate-2.jpg"],
      category: "Corporate"
    },
    {
      id: 3,
      title: "Charity Foundation Fundraiser",
      date: "January 20, 2024",
      location: "Community Center",
      attendees: 250,
      description: "A heartwarming event combining gourmet dining with community support.",
      images: ["/images/events/charity-1.jpg", "/images/events/charity-2.jpg"],
      category: "Charity"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-purple-600 text-sm font-semibold tracking-wider uppercase">
            Our Track Record
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Past Events
          </h2>
          <p className="text-gray-600 text-lg">
            Relive the magical moments we've created for our cherished clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                  {event.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{event.attendees} Guests</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {event.description}
                </p>

                <button className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200">
                  View Gallery
                  <Camera size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}