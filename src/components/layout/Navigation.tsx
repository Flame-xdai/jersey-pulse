import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Grid3X3, 
  Plane, 
  Calendar, 
  Star,
  Crown,
  Shirt,
  ShirtIcon,
  Clock,
  Trophy,
  ChevronRight,
  Globe
} from 'lucide-react';

const navigationItems = [
  { name: 'All Products', name_bn: 'সব পণ্য', icon: Grid3X3, href: '/' },
  { name: 'All Category', name_bn: 'সব ক্যাটেগরি', icon: Home, href: '/categories' },
  { name: 'Travel Shirt', name_bn: 'ট্রাভেল শার্ট', icon: Plane, href: '/travel-shirt' },
  { name: '25/26 Season', name_bn: '২৫/২৬ সিজন', icon: Calendar, href: '/season-25-26' },
  { name: 'Barcelona', name_bn: 'বার্সেলোনা', icon: Star, href: '/barcelona' },
  { name: 'Real Madrid', name_bn: 'রিয়াল মাদ্রিদ', icon: Crown, href: '/real-madrid' },
  { name: 'Half Sleeve Jersey', name_bn: 'হাফ স্লিভ জার্সি', icon: Shirt, href: '/half-sleeve' },
  { name: 'Full Sleeve Jersey', name_bn: 'ফুল স্লিভ জার্সি', icon: ShirtIcon, href: '/full-sleeve' },
  { name: 'Retro Jersey Collection', name_bn: 'রেট্রো জার্সি কালেকশন', icon: Clock, href: '/retro' },
  { name: 'Club Jersey 24/25 kit', name_bn: 'ক্লাব জার্সি ২৪/২৫ কিট', icon: Trophy, href: '/club-jersey' },
  { name: 'Coming Soon', name_bn: 'শীঘ্রই আসছে', icon: Calendar, href: '/coming-soon' },
];

const Navigation = () => {
  return (
    <nav className="py-4">
      <div className="space-y-2">
        {navigationItems.map((item, index) => (
          <div key={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-4 text-left hover:bg-accent"
            >
              <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground font-bengali">{item.name_bn}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
            {index === 2 && <Separator className="my-2" />}
            {index === 5 && <Separator className="my-2" />}
            {index === 9 && <Separator className="my-2" />}
          </div>
        ))}
        
        <Separator className="my-4" />
        
        {/* Language Toggle */}
        <Button variant="ghost" className="w-full justify-start h-12 px-4">
          <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
          <div className="flex-1">
            <div className="font-medium">English</div>
            <div className="text-xs text-muted-foreground">বাংলা</div>
          </div>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;