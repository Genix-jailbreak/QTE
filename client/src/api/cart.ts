import axios from 'axios';
import { CartItem } from '../../hooks/useCart';
const API_URL = import.meta.env.VITE_API_URL;


export const getCart = async (userId: string): Promise<CartItem[]> => {
    // get the unique user's cart using their id.
    const {data} = await axios.get(`${API_URL}/api/cart/${userId}`);
    return data;
}

export const updateCart = async (userId: string, items: CartItem[]): Promise<void> => {
    // update the cart (using the userId), and the already existing cart item (or the items the user just picked) and send to the backend API.
    await axios.put(`${API_URL}/api/cart/${userId}`, { items });
}

export const clearCart = async (userId: string): Promise<void> => {
    // clear the cart (by deleting the exact user's cart), using their id.
    await axios.delete(`${API_URL}/api/cart/${userId}`);
}