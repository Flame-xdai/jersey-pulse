import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { submitOrder } from '@/lib/api';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

const areas = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
  'Others'
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = 'নাম অন্তত ৩ অক্ষরের হতে হবে | Name must be at least 3 characters';
    }

    if (!formData.phone.trim() || !/^(\+880|0)?1[3-9]\d{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'সঠিক ফোন নম্বর দিন | Please enter a valid phone number';
    }

    if (!formData.address.trim() || formData.address.length < 10) {
      newErrors.address = 'সম্পূর্ণ ঠিকানা দিন | Please provide complete address';
    }

    if (!formData.area) {
      newErrors.area = 'এলাকা নির্বাচন করুন | Please select your area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "ফর্ম ভুল | Form Error",
        description: "দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitOrder({
        items,
        customer: formData,
        total: getTotalPrice()
      });

      if (result.success) {
        clearCart();
        toast({
          title: "অর্ডার সফল | Order Successful",
          description: "আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে",
        });
        navigate('/order-success', { state: { orderId: result.orderId } });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "অর্ডার ব্যর্থ | Order Failed",
        description: "অর্ডার প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20">
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
            <h1 className="text-xl font-bold">চেকআউট | Checkout</h1>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg p-4 border mb-6">
            <h2 className="font-semibold mb-3">অর্ডার সারাংশ | Order Summary</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.title_bn} ({item.size})</span>
                  <span>৳{item.product.price_bdt * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>মোট | Total</span>
                  <span>৳{getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>পূর্ণ নাম | Full Name *</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>ফোন নম্বর | Phone Number *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>সম্পূর্ণ ঠিকানা | Complete Address *</span>
              </Label>
              <Textarea
                id="address"
                placeholder="বাড়ি/ফ্ল্যাট নম্বর, রাস্তা, থানা, জেলা"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className={errors.address ? 'border-destructive' : ''}
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            {/* Area Selection */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>এলাকা | Area *</span>
              </Label>
              <Select
                value={formData.area}
                onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
              >
                <SelectTrigger className={errors.area ? 'border-destructive' : ''}>
                  <SelectValue placeholder="আপনার এলাকা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area && (
                <p className="text-sm text-destructive">{errors.area}</p>
              )}
            </div>

            {/* Order Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>অর্ডার নোট | Order Notes (Optional)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="বিশেষ নির্দেশনা বা মন্তব্য"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={2}
              />
            </div>

            {/* Payment Info */}
            <div className="bg-accent/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">পেমেন্ট পদ্ধতি | Payment Method</h3>
              <p className="text-sm text-muted-foreground">
                💰 ক্যাশ অন ডেলিভারি | Cash on Delivery Only
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                পণ্য হাতে পেয়ে টাকা দিন | Pay when you receive the product
              </p>
            </div>

            {/* Submit Button */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="sticky bottom-20 md:bottom-4 bg-background pt-4"
            >
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'অর্ডার প্রক্রিয়াকরণ...' : `অর্ডার নিশ্চিত করুন - ৳${getTotalPrice()}`}
              </Button>
            </motion.div>
          </form>
        </div>
      </main>

      <BottomNavigation />
      <WhatsAppFloat />
    </div>
  );
};

export default Checkout;