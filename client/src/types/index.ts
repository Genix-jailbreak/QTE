// For the native backend
export interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface Booking {
  _id?: string;
  clientName: string;
  eventType: string;
  date: Date;
  guestCount: number;
  services: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
}

export interface Inquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'inProgress' | 'resolved';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  created_at: string;
  category: ProductCategory;
  available: boolean;
  preparationTime?: string;
  allergens?: string[];
}

export type ProductCategory = 'cakes' | 'pastries' | 'desserts' | 'cookies';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingDetails {
  id: string;
  clientName: string;
  eventDate: Date;
  eventType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  requirements: string;
  users: {
    email: string;
    phone: string;
  };
}
