export interface Product {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  price_bdt: number;
  original_price: number;
  discount: number;
  images: string[];
  sizes: string[];
  stock: Record<string, number>;
  description_en: string;
  description_bn: string;
  tags: string[];
  category: string;
  available: boolean;
  weight_kg: number;
  release_date: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  area: string;
  notes?: string;
}

export interface Order extends OrderFormData {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}