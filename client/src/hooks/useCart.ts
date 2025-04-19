import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CartStorage } from '../utils/indexedDB';
import { getCart, updateCart, clearCart } from '../api/cart';

// Hook Functions to write.

/*
    - addToCart
    - removeFromCart
    - updateQuantity
    - clearCart
    - getTotal

    - Don't lose your problem solving and programming skillset -> It's going to be very useful for you, bratan.
    - Master your skills even if it means brushing the fundamentals of programming again, so you adapt easily to contribute and code on a very high level.

    - Leave SukiMedia - SukiAI, Suki-Everything and focus on problem solving on a very high level- Become a top master of your craft on a very high level
*/
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // This stores the cart (already populated) in the localStorage of the browser and returns the stored cart in JSON format
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Update the cart (with a side effect) if there's a change to it, without re-rendering the page
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    // Take in the cart item, and the number of cart Items to be added to the cart.
    setCart(currentCart => {
        const existingItem = currentCart.find(item => item.id === product.id);
        
        if (existingItem) {
          return currentCart.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
  
        return [...currentCart, { ...product, quantity: 1 }];
      });
  };

  const removeFromCart = async (productId: string) => {
    // filters all the cart items that are not being removed (specified in the cart array) back into the cart, removing the one that was specified. (one at a time)
    setCart(cart.filter(item => item.id !== productId))

    if (user) {
        await updateCart(user.id, cart);
    } else {
        await cartStorage.remove(productId);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    // Takes the new product(s) by pushing it(them) into the new cart, and overwriting the cart with the newly added product.
    setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    setCart([]);

    if (user) {
        await clearCart(user.id);
    } else {
        await cartStorage.clear();
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
        return accumulator + (item.price * item.quantity)
    }, 0)
  }

  return { 
    cart, 
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal
  };
}