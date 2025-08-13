import React, { useState, useEffect } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProductGrid from '@/components/product/ProductGrid';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { Truck, Shield, HeadphonesIcon } from 'lucide-react';
import productsData from '@/data/products.json';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setProducts(productsData as Product[]);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', name_bn: 'সব পণ্য' },
    { id: 'Barcelona', name: 'Barcelona', name_bn: 'বার্সেলোনা' },
    { id: 'Real Madrid', name: 'Real Madrid', name_bn: 'রিয়াল মাদ্রিদ' },
    { id: 'Travel Shirt', name: 'National Teams', name_bn: 'জাতীয় দল' },
    { id: 'Club Jersey 24/25 kit', name: 'Club Jerseys', name_bn: 'ক্লাব জার্সি' },
    { id: 'Retro Jersey Collection', name: 'Retro Collection', name_bn: 'রেট্রো কালেকশন' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        
        <main>
          <HeroSection />
          
          {/* Category Filters */}
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="flex gap-2 overflow-x-auto pb-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {categories.find(c => c.id === selectedCategory)?.name || 'Products'}
                  </h2>
                  <p className="text-muted-foreground font-bengali">
                    {categories.find(c => c.id === selectedCategory)?.name_bn}
                  </p>
                </div>
                <Badge variant="outline">
                  {filteredProducts.length} items
                </Badge>
              </div>

              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick delivery across Bangladesh within 2-3 days
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold">Authentic Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    100% authentic jerseys with quality guarantee
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <HeadphonesIcon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Always here to help via WhatsApp and Facebook
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <WhatsAppFloat />
        <BottomNavigation />
        
        {/* Mobile padding for bottom navigation */}
        <div className="h-16 md:hidden"></div>
      </div>
    </CartProvider>
  );
};

export default Index;
