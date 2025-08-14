import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 pb-20">
          <div className="px-4 py-6">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-8 w-8 mr-3"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold">শপিং কার্ট | Shopping Cart</h1>
            </div>

            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">আপনার কার্ট খালি</h2>
              <p className="text-muted-foreground mb-6">কেনাকাটা শুরু করতে কিছু পণ্য যোগ করুন</p>
              <Button onClick={() => navigate('/')}>
                কেনাকাটা শুরু করুন | Start Shopping
              </Button>
            </div>
          </div>
        </main>

        <BottomNavigation />
        <WhatsAppFloat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-32">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8 mr-3"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">
              শপিং কার্ট | Shopping Cart ({getTotalItems()})
            </h1>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-4 border"
              >
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title_en}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">
                      {item.product.title_bn}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Size: {item.size}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ৳{item.product.price_bdt * item.quantity}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="h-8 w-8"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="h-8 w-8"
                      disabled={item.quantity >= (item.product.stock[item.size] || 0)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    ৳{item.product.price_bdt} each
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4 md:bottom-0">
          <div className="max-w-md mx-auto space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>মোট | Total:</span>
              <span className="text-primary">৳{getTotalPrice()}</span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={() => navigate('/checkout')}
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              চেকআউট | Checkout
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              ক্যাশ অন ডেলিভারি | Cash on Delivery Available
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
      <WhatsAppFloat />
    </div>
  );
};

export default Cart;