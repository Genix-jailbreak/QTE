import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryItems = [
    {
      id: 1,
      image: '/images/gallery/wedding-cake-1.jpg',
      category: 'Wedding Cakes',
      title: 'Elegant Wedding Cake',
      description: 'A stunning three-tier wedding cake with delicate floral details'
    },
    {
      id: 2,
      image: '/images/gallery/birthday-cake-1.jpg',
      category: 'Birthday Cakes',
      title: 'Colorful Birthday Cake',
      description: 'Vibrant and fun birthday cake perfect for any celebration'
    },
    {
      id: 3,
      image: '/images/gallery/dessert-platter.jpg',
      category: 'Desserts',
      title: 'Exquisite Dessert Platter',
      description: 'An assortment of premium handcrafted desserts'
    },
    {
      id: 4,
      image: '/images/gallery/catering-setup.jpg',
      category: 'Event Catering',
      title: 'Elegant Catering Setup',
      description: 'Professional catering presentation for special events'
    },
    {
      id: 5,
      image: '/images/gallery/cupcake-display.jpg',
      category: 'Cupcakes',
      title: 'Delicious Cupcake Selection',
      description: 'Artisanal cupcakes in various flavors and designs'
    }
  ];

  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Gallery of Creations
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Explore our collection of handcrafted masterpieces
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                  ${selectedCategory === category 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                  } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={14} className="inline mr-2" />
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-purple-300 text-sm mb-2">{item.category}</p>
                  <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  <button
                    onClick={() => setSelectedImage(item.image)}
                    className="inline-flex items-center text-white bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <ZoomIn size={16} className="mr-2" />
                    View Image
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-purple-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X size={32} />
              </button>
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <img
                  src={selectedImage}
                  alt="Gallery preview"
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}