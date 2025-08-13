import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartContextType, Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jerseystore_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('jerseystore_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    // Check stock availability
    const availableStock = product.stock[size] || 0;
    const existingItem = items.find(item => item.id === product.id && item.size === size);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + quantity > availableStock) {
      toast({
        title: "স্টক সীমিত | Limited Stock",
        description: `শুধুমাত্র ${availableStock}টি আইটেম স্টকে আছে | Only ${availableStock} items available in stock`,
        variant: "destructive",
      });
      return;
    }

    setItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prev, { id: product.id, product, size, quantity }];
      }
    });

    toast({
      title: "কার্টে যোগ করা হয়েছে | Added to Cart",
      description: `${product.title_bn} (${size}) কার্টে যোগ করা হয়েছে`,
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    toast({
      title: "কার্ট থেকে মুছে ফেলা হয়েছে | Removed from Cart",
      description: "আইটেমটি কার্ট থেকে মুছে ফেলা হয়েছে",
    });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setItems(prev => {
      const item = prev.find(item => item.id === id && item.size === size);
      if (!item) return prev;

      // Check stock availability
      const availableStock = item.product.stock[size] || 0;
      if (quantity > availableStock) {
        toast({
          title: "স্টক সীমিত | Limited Stock",
          description: `শুধুমাত্র ${availableStock}টি আইটেম স্টকে আছে | Only ${availableStock} items available`,
          variant: "destructive",
        });
        return prev;
      }

      return prev.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "কার্ট খালি করা হয়েছে | Cart Cleared",
      description: "সব আইটেম কার্ট থেকে মুছে ফেলা হয়েছে",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price_bdt * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};