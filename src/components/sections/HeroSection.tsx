import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-jerseys.jpg';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-success text-success-foreground">
                ✨ Authentic Jerseys Only
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Premium Football{' '}
                <span className="text-primary">Jerseys</span>
                <br />
                <span className="font-bengali text-2xl md:text-3xl text-muted-foreground">
                  প্রিমিয়াম ফুটবল জার্সি
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Discover authentic jerseys from top clubs worldwide. 
                Quality guaranteed, fast delivery across Bangladesh.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1 sm:flex-none">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                View Collections
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">5000+</span> Happy Customers
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Premium Football Jerseys Collection"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs text-muted-foreground">Best Seller</div>
                <div className="font-semibold">Barcelona 2024</div>
                <div className="text-primary font-bold">৳1,799</div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs text-muted-foreground">New Arrival</div>
                <div className="font-semibold">Real Madrid</div>
                <div className="text-primary font-bold">৳1,799</div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;