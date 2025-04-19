import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CartStorage } from '../utils/indexedDB';
import { cartApi } from '../services/cartApi';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
} | null>(null);

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
      };
    case 'CLEAR_CART':
      return { items: [], total: 0, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();
  const cartStorage = new CartStorage();

  useEffect(() => {
    const initCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        if (user) {
          const serverCart = await cartApi.getCart(user.id);
          dispatch({ type: 'SET_CART', payload: serverCart });
        } else {
          const localCart = await cartStorage.getAll();
          dispatch({ type: 'SET_CART', payload: localCart });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initCart();
  }, [user]);

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } });
      if (user) {
        await cartApi.updateCart(user.id, state.items);
      } else {
        await cartStorage.add({ ...product, quantity: 1 });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item' });
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      if (user) {
        await cartApi.updateCart(user.id, state.items);
      } else {
        await cartStorage.remove(productId);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item' });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
      if (user) {
        await cartApi.updateCart(user.id, state.items);
      } else {
        await cartStorage.update(productId, quantity);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update quantity' });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      if (user) {
        await cartApi.clearCart(user.id);
      } else {
        await cartStorage.clear();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    }
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}