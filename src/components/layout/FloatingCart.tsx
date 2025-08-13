import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const FloatingCart = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-primary-foreground p-3 rounded-full shadow-2xl flex items-center justify-center w-14 h-14 relative"
        onClick={() => {/* TODO: Navigate to cart */}}
        aria-label="View cart"
      >
        <ShoppingCart className="w-6 h-6" />
        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground">
          {totalItems}
        </Badge>
      </motion.button>
    </div>
  );
};

export default FloatingCart;