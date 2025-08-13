import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';

const AnnouncementBar = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/8801771902725?text=Hi%20JerseyStore,%20I%20need%20help', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://facebook.com/jerseystore', '_blank');
  };

  return (
    <div className="bg-announcement text-announcement-foreground py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between text-sm">
          <div className="hidden md:block announcement-scroll whitespace-nowrap">
            Welcome to Additional Store – Authentic Jerseys. Trusted Service. Fast Delivery. 
            Need help? Inbox us on Facebook Or Whatsapp: 01771902725/01829067063
          </div>
          
          {/* Mobile version */}
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="text-xs">🔥 Authentic Jerseys • Fast Delivery</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="announcement" 
                onClick={handleWhatsAppClick}
                className="h-6 px-2 text-xs"
              >
                <MessageCircle className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="announcement" 
                onClick={handleFacebookClick}
                className="h-6 px-2 text-xs"
              >
                <Phone className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Desktop contact buttons */}
          <div className="hidden md:flex gap-3">
            <Button 
              size="sm" 
              variant="announcement" 
              onClick={handleWhatsAppClick}
              className="text-xs"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              WhatsApp
            </Button>
            <Button 
              size="sm" 
              variant="announcement" 
              onClick={handleFacebookClick}
              className="text-xs"
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;