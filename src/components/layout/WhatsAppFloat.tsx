import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi JerseyStore, I need help with ordering authentic jerseys. Can you assist me?"
    );
    window.open(`https://wa.me/8801952081184?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="floating"
        size="floating"
        onClick={handleWhatsAppClick}
        className="shadow-2xl"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;