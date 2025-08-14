import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Zap, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRecentProducts } from '@/hooks/useRecentProducts';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const { addRecentProduct } = useRecentProducts();

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    addToCart(product, selectedSize);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    window.location.href = '/cart';
  };

  const isOutOfStock = (size: string) => {
    return (product.stock[size] || 0) === 0;
  };

  const isLowStock = (size: string) => {
    const stock = product.stock[size] || 0;
    return stock > 0 && stock <= 3;
  };

  const handleCardClick = () => {
    addRecentProduct(product.id);
    window.location.href = `/product/${product.slug}`;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg product-card-mobile",
        className
      )}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div 
            className="relative overflow-hidden rounded-t-lg aspect-square"
            onClick={handleCardClick}
          >
          <img
            src={product.images[0]}
            alt={product.title_en}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-discount text-white">
              -{product.discount}%
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" size="sm">
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
              {product.title_en}
            </h3>
            <p className="text-xs text-muted-foreground font-bengali line-clamp-1">
              {product.title_bn}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-price">
              {formatPrice(product.price_bdt)}
            </span>
            {product.original_price > product.price_bdt && (
              <span className="text-sm text-price-original line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Size:</Label>
            <RadioGroup 
              value={selectedSize} 
              onValueChange={setSelectedSize}
              className="flex gap-1"
            >
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem
                    value={size}
                    id={`${product.id}-${size}`}
                    className="sr-only"
                    disabled={isOutOfStock(size)}
                  />
                  <Label
                    htmlFor={`${product.id}-${size}`}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 text-xs border rounded cursor-pointer transition-colors",
                      selectedSize === size 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "border-input hover:border-primary",
                      isOutOfStock(size) && "opacity-50 cursor-not-allowed bg-muted"
                    )}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {/* Stock Status */}
            {isLowStock(selectedSize) && !isOutOfStock(selectedSize) && (
              <p className="text-xs text-warning">
                Only {product.stock[selectedSize]} left!
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              variant="cart"
              size="cart"
              onClick={handleAddToCart}
              disabled={isLoading || isOutOfStock(selectedSize)}
              className="flex-1"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
            
            <Button
              variant="buy"
              size="cart"
              onClick={handleBuyNow}
              disabled={isOutOfStock(selectedSize)}
              className="flex-1"
            >
              <Zap className="h-3 w-3 mr-1" />
              Buy Now
            </Button>
          </div>

          {/* Out of Stock Message */}
          {isOutOfStock(selectedSize) && (
            <p className="text-xs text-destructive text-center pt-1">
              Out of stock in {selectedSize}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
};

export default ProductCard;