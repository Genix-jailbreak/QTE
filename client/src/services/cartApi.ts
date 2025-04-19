import axios from 'axios';
import { CartItem } from '../context/CartContext';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "process.env.REACT_APP_API_URL";

export const cartApi = {
  async getCart(userId: string): Promise<CartItem[]> {
    const { data } = await axios.get(`${API_URL}/api/cart/${userId}`);
    return data;
  },

  async updateCart(userId: string, items: CartItem[]): Promise<void> {
    await axios.put(`${API_URL}/api/cart/${userId}`, { items });
  },

  async clearCart(userId: string): Promise<void> {
    await axios.delete(`${API_URL}/api/cart/${userId}`);
  }
};