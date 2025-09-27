import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';
import logo from '../assets/044abb2685433836a7efa57953cd0ac793faa139.png'; // Adjust the path as necessary

interface HeaderProps {
  navigateToPage?: (page: 'home' | 'products' | 'about-page' | 'contact-page' | 'admin') => void;
}

export function Header({ navigateToPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // First navigate to home page, then scroll to section
    if (navigateToPage) {
      navigateToPage('home');
      // Wait for page to load then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (page: 'home' | 'products' | 'about-page' | 'contact-page' | 'admin') => {
    if (navigateToPage) {
      navigateToPage(page);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('home')}>
            <img src={logo} alt="Medivance Healthcare" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('about-page')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('products')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('research')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Research & Quality
            </button>
            {/* <button 
              onClick={() => scrollToSection('doctors')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Doctors & Patients
            </button> */}
            <button 
              onClick={() => handleNavigation('contact-page')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
            
            {/* Admin Access */}
            {/* /*<button 
              onClick={() => handleNavigation('admin')}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors ml-4 pl-4 border-l border-gray-200"
              title="Admin Panel"
            >
              <Shield className="h-4 w-4" />
            </button>*/ }
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-100">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('about-page')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation('products')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('research')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Research & Quality
              </button>
              {/* <button 
                onClick={() => scrollToSection('doctors')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Doctors & Patients
              </button> */}
              <button 
                onClick={() => handleNavigation('contact-page')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Contact
              </button>
              
              {/* Admin Access for Mobile */}
              {/* <div className="border-t border-gray-200 pt-4 mt-4">
                <button 
                  onClick={() => handleNavigation('admin')}
                  className="flex items-center w-full text-left px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </button>
              </div> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}