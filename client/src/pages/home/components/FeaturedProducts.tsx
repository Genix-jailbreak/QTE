// const fetchProducts = async () => {
//   try {
//     const response = await fetch('/api/products/featured');
//     if (!response.ok) throw new Error('Failed to fetch products');
//     const data = await response.json();
//     setProducts(data);
//   } catch (err) {
//     setError('Failed to load products');
//     console.error('Error:', err);
//   } finally {
//     setIsLoading(false);
//   }
// };

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { Product } from '../../../types';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

const demoProducts: Product[] = [
  {
    id: 1,
    name: 'Luxury Chocolate Cake',
    description: 'A rich, moist chocolate cake with layers of ganache.',
    price: 29.99,
    image: '/images/Cake.jpg',
    category: "cake",
    orderLink: "luxury-choc-cake"
  },
  {
    id: 2,
    name: 'Berry Delight Pie',
    description: 'A sweet and tangy berry pie with a crisp crust.',
    price: 19.99,
    image: '/images/pie.jpg',
    category: "pastery",
    orderLink: "berry-delight-pie"
  },
  {
    id: 3,
    name: 'Pastery Collection',
    description: 'Flaky, buttery Pastery Collection freshly made to golden perfection.',
    price: 44.99,
    image: '/images/pasteries.jpg',
    category: "pastery",
    orderLink: "pastery-collection"
  },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simulate API delay
      setTimeout(() => {
        setProducts(demoProducts);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load products');
      setIsLoading(false);
    }
  };

  const categories = ['all', ...new Set(demoProducts.map(product => product.category))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section className="bg-gradient-to-b from-purple-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 text-sm font-semibold tracking-wider uppercase">
            Featured Collection
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Our Signature Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handcrafted with love and attention to detail, our signature products are designed to make your special moments unforgettable.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all
                ${selectedCategory === category 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-600 hover:bg-purple-50'}`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium capitalize">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {product.description}
                </p>

                <Link 
                  to={`/order/${product.orderLink}`}
                  className="group inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  <ShoppingCart size={18} />
                  <span>Order Now</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}