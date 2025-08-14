import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useRecentProducts } from '@/hooks/useRecentProducts';
import ProductCarousel from '@/components/product/ProductCarousel';
import { Product as ProductType } from '@/types/product';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { toast } from '@/hooks/use-toast';

// Import product data
import productsData from '@/data/products.json';

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRecentProduct, getRecentProducts } = useRecentProducts();
  
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recentProducts, setRecentProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Find product by slug
    const foundProduct = productsData.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      addRecentProduct(foundProduct.id);
      
      // Get recent products excluding current one
      const recent = getRecentProducts(productsData).filter(p => p.id !== foundProduct.id).slice(0, 4);
      setRecentProducts(recent);
    }
  }, [slug, addRecentProduct, getRecentProducts]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "সাইজ নির্বাচন করুন | Select Size",
        description: "দয়া করে একটি সাইজ নির্বাচন করুন | Please select a size",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "সাইজ নির্বাচন করুন | Select Size", 
        description: "দয়া করে একটি সাইজ নির্বাচন করুন | Please select a size",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20">
        {/* Header */}
        <div className="bg-background border-b sticky top-16 z-30 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-accent">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[currentImageIndex]}
                alt={product.title_en}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 mt-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title_en} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">{product.title_bn}</h1>
              <p className="text-sm text-muted-foreground mt-1">{product.title_en}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">৳{product.price_bdt}</span>
              {product.original_price && product.original_price > product.price_bdt && (
                <>
                  <span className="text-lg text-muted-foreground line-through">৳{product.original_price}</span>
                  <Badge variant="destructive" className="text-xs">
                    {Math.round(((product.original_price - product.price_bdt) / product.original_price) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">সাইজ নির্বাচন করুন | Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const stock = product.stock[size] || 0;
                  const isOutOfStock = stock === 0;
                  const isSelected = selectedSize === size;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`h-12 rounded-md border text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : isOutOfStock
                          ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                          : 'border-border hover:border-primary hover:bg-accent'
                      }`}
                    >
                      {size}
                      {isOutOfStock && <div className="text-xs text-muted-foreground">Out</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold">বিবরণ | Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description_bn}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleBuyNow}
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              <Zap className="w-4 h-4 mr-2" />
              এখনই কিনুন | Buy Now
            </Button>
            
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              কার্টে যোগ করুন | Add to Cart
            </Button>
          </div>

          {/* Recent Products */}
          {recentProducts.length > 0 && (
            <ProductCarousel
              products={recentProducts}
              title="সম্প্রতি দেখা পণ্য | Recently Viewed"
              className="mt-8"
            />
          )}
        </div>
      </main>

      <BottomNavigation />
      <WhatsAppFloat />
    </div>
  );
};

export default Product;