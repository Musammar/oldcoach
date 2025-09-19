import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SystemCapabilities from '@/components/SystemCapabilities';
import Features from '@/components/Features';
import CoachAutomation from '@/components/CoachAutomation';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
const Index = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <SystemCapabilities />
      <Features />
      <Pricing />
      <CoachAutomation />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;