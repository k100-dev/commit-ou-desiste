import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { SupportButton } from './SupportButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <SupportButton />
    </div>
  );
};