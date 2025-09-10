
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import DashboardHeader from './DashboardHeader';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onLogoClick={handleLogoClick} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
