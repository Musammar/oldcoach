
import React from 'react';
import Hero from '@/components/Hero';
import SystemCapabilities from '@/components/SystemCapabilities';
import Features from '@/components/Features';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
const Index = () => {
  const { user } = useAuth();
    <div className="min-h-screen bg-background">
      <Navigation />
      <Pricing />
      <CoachAutomation />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
