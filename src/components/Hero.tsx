import React from 'react';
import { ArrowRight, Heart, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  navigateToPage?: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function Hero({ navigateToPage }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl text-gray-900 mb-6">
            Caring for Health, <br />
            <span className="text-blue-600">Building a Better Future</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Medivance Healthcare is committed to providing essential medicines and innovative healthcare solutions that improve lives worldwide. Your health is our priority.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigateToPage ? navigateToPage('products') : scrollToSection('medicines')}
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => navigateToPage ? navigateToPage('contact-page') : scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600">Putting patients first in everything we do</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Highest standards in safety and efficacy</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Trusted by Millions</h3>
              <p className="text-gray-600">Serving communities around the world</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}