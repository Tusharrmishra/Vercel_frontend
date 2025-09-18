import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../assets/044abb2685433836a7efa57953cd0ac793faa139.png';

interface FooterProps {
  navigateToPage?: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function Footer({ navigateToPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Medivance Healthcare" className="h-10 w-auto mb-4 brightness-1 Ventures@123" />
            <p className="text-gray-300 text-sm mb-4">
              Caring for Health, Building a Better Future. Your trusted partner in pharmaceutical excellence and healthcare innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigateToPage ? navigateToPage('home') : scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage ? navigateToPage('about-page') : scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage ? navigateToPage('products') : scrollToSection('medicines')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('research')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage ? navigateToPage('contact-page') : scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className="text-white mb-4">Products & Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Antibiotics</li>
              <li>Pain Relievers</li>
              <li>Supplements</li>
              <li>Wellness Products</li>
              <li>Medical Information</li>
              <li>Patient Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+91 7977692965 /+91 8779723410 /<br/>+91 8097167052</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">medivancehealthcare96@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Office No. 1309, Master Mind-V, Building  <br />Royal Palm,Aarey Milk Colony, Goregaon (East), Mumbai-400 065.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Medivance Healthcare. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Site Map</a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-xs text-center">
              This website is for informational purposes only and does not constitute medical advice. 
              Always consult with a qualified healthcare professional before making any decisions about your health or medications. 
              Medivance Healthcare products are available by prescription only in most jurisdictions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}