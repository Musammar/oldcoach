
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/50 border-t py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-md">
              AI-powered automation platform helping coaches scale their practice with intelligent workflows and client management.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 CoachFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
