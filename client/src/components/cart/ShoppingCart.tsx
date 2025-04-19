import { useCart } from '../../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

export function ShoppingCart() {
  const { state, dispatch } = useCart();

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <AnimatePresence>
        {state.items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex items-center gap-4 mb-4"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity - 1 }
                })}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity + 1 }
                })}>+</button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-auto">
        <div className="flex justify-between mb-4">
          <span>Total:</span>
          <span className="font-bold">${state.total}</span>
        </div>
        <button 
          onClick={() => window.location.href = '/checkout'}
          className="w-full bg-primary text-white py-3 rounded-md"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}