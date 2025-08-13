import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, className }) => {
  return (
    <div className={cn(
      "mobile-grid",
      "grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
      "gap-3 md:gap-5",
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="w-full"
        />
      ))}
    </div>
  );
};

export default ProductGrid;