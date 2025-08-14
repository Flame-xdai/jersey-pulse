import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || 'JS-XXXX';

  useEffect(() => {
    // Clear any cached data
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi JerseyStore, I just placed an order #${orderId}. When will it be delivered?`
    );
    window.open(`https://wa.me/8801952081184?text=${message}`, '_blank');
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20">
        <div className="px-4 py-8">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-24 h-24 mx-auto"
            >
              <CheckCircle className="w-24 h-24 text-green-500" />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h1 className="text-2xl font-bold text-foreground">
                অর্ডার সফল! 🎉
              </h1>
              <p className="text-muted-foreground">
                আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে
              </p>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-lg p-6 border space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">অর্ডার আইডি:</span>
                  <span className="font-mono text-sm font-semibold">{orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">আনুমানিক ডেলিভারি:</span>
                  <span className="text-sm font-semibold text-primary">
                    {deliveryDate.toLocaleDateString('bn-BD', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">পেমেন্ট:</span>
                  <span className="text-sm font-semibold">ক্যাশ অন ডেলিভারি</span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-semibold">পরবর্তী ধাপ:</h3>
              <div className="text-left space-y-2 text-sm text-muted-foreground">
                <p>✅ আমরা আপনার অর্ডার প্রক্রিয়া করছি</p>
                <p>📦 পণ্য প্যাকেজিং হবে</p>
                <p>🚚 কুরিয়ার এ দেওয়া হবে</p>
                <p>📞 ডেলিভারির আগে ফোন করা হবে</p>
                <p>💰 পণ্য হাতে পেয়ে টাকা দিন</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 pt-4"
            >
              <Button
                onClick={handleWhatsAppContact}
                className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                হোয়াটসঅ্যাপে যোগাযোগ করুন
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="h-10"
                >
                  <Home className="w-4 h-4 mr-2" />
                  হোমে ফিরুন
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'tel:+8801952081184'}
                  className="h-10"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  কল করুন
                </Button>
              </div>
            </motion.div>

            {/* Support Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t"
            >
              <p className="text-xs text-muted-foreground">
                কোন সমস্যায় আমাদের সাথে যোগাযোগ করুন<br/>
                হোয়াটসঅ্যাপ: 01952081184 | ফোন: 01952081184
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrderSuccess;