import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ProductCard } from '../../components/products/ProductCard';
import { useDebounce } from '../../hooks/useDebounce';
import { Product } from '../../types';
import { supabase } from '../../config/supabase';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'cookies', name: 'Cookies' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, debouncedSearch, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select('*');

      // Apply category filter
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      // Apply search
      if (debouncedSearch) {
        query = query.ilike('name', `%${debouncedSearch}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name-asc':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data || []);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Native Backend.
  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       `/api/products?category=${activeCategory}&search=${debouncedSearch}&sort=${sortBy}`
  //     );
  //     if (!response.ok) throw new Error('Failed to fetch products');
  //     const data = await response.json();
  //     setProducts(data);
  //     setError('');
  //   } catch (err) {
  //     setError('Failed to load products');
  //     console.error('Error:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="bg-gradient-to-b from-white to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600">
            Discover our handcrafted selection of cakes, pastries, and desserts
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-4 py-2 rounded-full transition-all
                  ${activeCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-12">{error}</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}