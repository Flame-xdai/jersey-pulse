import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const MAX_RECENT = 6;
const RECENT_PRODUCTS_KEY = 'recentProducts';

export function useRecentProducts() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_PRODUCTS_KEY);
    if (stored) {
      try {
        setRecentIds(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recent products:', error);
        localStorage.removeItem(RECENT_PRODUCTS_KEY);
      }
    }
  }, []);

  const addRecentProduct = (productId: string) => {
    setRecentIds(prev => {
      const updated = [productId, ...prev.filter(id => id !== productId)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getRecentProducts = (allProducts: Product[]): Product[] => {
    return recentIds
      .map(id => allProducts.find(product => product.id === id))
      .filter((product): product is Product => product !== undefined);
  };

  const clearRecentProducts = () => {
    setRecentIds([]);
    localStorage.removeItem(RECENT_PRODUCTS_KEY);
  };

  return {
    recentIds,
    addRecentProduct,
    getRecentProducts,
    clearRecentProducts
  };
}