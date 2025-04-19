import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-red-500' : 'bg-white'
            } shadow-md transition-colors`}
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? 'text-white fill-current' : 'text-gray-600'}`} 
            />
          </button>
        </div>
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 bg-red-500 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {product.name}
            </h3>
            <span className="inline-block px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
              {product.category}
            </span>
          </div>
          <span className="text-xl font-bold text-purple-600">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {(product.preparationTime || product.allergens) && (
          <div className="space-y-2 mb-4">
            {product.preparationTime && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Prep time: {product.preparationTime}
              </div>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Allergens:</span>{' '}
                {product.allergens.join(', ')}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => product.available && addToCart(product)}
          disabled={!product.available || product.stock === 0}
          className={`
            mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
            transition-colors duration-300 ${
              product.available && product.stock > 0
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-200 cursor-not-allowed text-gray-500'
            }
          `}
        >
          <ShoppingCart className="w-4 h-4" />
          {!product.available ? 'Sold Out' : 
           product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}