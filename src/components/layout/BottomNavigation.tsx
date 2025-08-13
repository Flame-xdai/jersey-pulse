import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg md:hidden z-40">
      <div className="grid grid-cols-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-16 rounded-none flex-col gap-1 text-xs hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center"
          onClick={() => window.location.href = '/'}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-16 rounded-none flex-col gap-1 text-xs hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center"
          onClick={() => {/* TODO: Implement search */}}
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-16 rounded-none flex-col gap-1 text-xs relative hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center justify-center"
          onClick={() => {/* TODO: Implement cart page */}}
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                {totalItems}
              </Badge>
            )}
          </div>
          <span>Cart</span>
        </motion.button>
      </div>
    </div>
  );
};

export default BottomNavigation;