import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Calendar, MessageCircle, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-primary' : 'text-gray-500';

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Map },
    { path: '/itinerary', label: 'Itinerary', icon: Calendar },
    { path: '/guide', label: 'AI Guide', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Top Header - Mobile */}
      <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center md:hidden">
        <div className="flex items-center gap-2">
          <Map size={24} />
          <h1 className="text-xl font-bold">Murree Guide</h1>
        </div>
      </header>

      {/* Top Header - Desktop */}
      <header className="hidden md:flex bg-white shadow-sm sticky top-0 z-50 px-8 py-4 justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl">
           <Map size={28} />
           <span>Murree Guide</span>
        </Link>
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-2 font-medium hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-gray-600'}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center md:hidden z-40">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${isActive(item.path)}`}>
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};