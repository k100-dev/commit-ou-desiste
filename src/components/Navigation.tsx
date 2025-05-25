import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/transactions', label: 'Transações' },
    { path: '/acid', label: 'Propriedades ACID' },
    { path: '/concurrency', label: 'Problemas de Concorrência' },
    { path: '/deadlock', label: 'Deadlocks' },
    { path: '/quiz', label: 'Quiz' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2 text-blue-600">
          <Database className="h-6 w-6" />
          <span className="text-xl font-bold">Commit ou Desiste</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => 
                `transition-colors duration-300 hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={toggleMenu}
          aria-label="Alternar menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navLinks.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  `px-2 py-2 rounded transition-colors duration-300 ${
                    isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};