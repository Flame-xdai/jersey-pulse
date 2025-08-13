import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  title, 
  className = '' 
}) => {
  if (products.length === 0) return null;

  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ProductCard product={product} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;