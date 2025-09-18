import React from 'react';
import { Target, Eye, Award } from 'lucide-react';
import { Button } from './ui/button';

interface AboutProps {
  navigateToPage?: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function About({ navigateToPage }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">About Medivance Healthcare</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              With over two decades of experience, we're dedicated to making quality healthcare accessible to everyone through innovative medicines and unwavering commitment to excellence.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide safe, effective, and affordable healthcare solutions that improve the quality of life for patients worldwide.
              </p>
            </div>

            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be a leading global pharmaceutical company recognized for innovation, quality, and commitment to patient care.
              </p>
            </div>

            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Integrity, innovation, excellence, and compassion guide every decision we make in serving our patients and communities.
              </p>
            </div>
          </div>

          {/* Company Stats */}
          {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 lg:p-12 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl mb-2">20+</div>
                <p className="text-blue-100">Years of Experience</p>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl mb-2">50+</div>
                <p className="text-blue-100">Countries Served</p>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl mb-2">100M+</div>
                <p className="text-blue-100">Patients Helped</p>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl mb-2">200+</div>
                <p className="text-blue-100">Medical Products</p>
              </div>
            </div>
          </div> */}

          {/* Quality Commitment */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl text-gray-900 mb-6">Our Commitment to Quality Healthcare</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              At Medivance Healthcare, we understand that health is the foundation of a fulfilling life. That's why we maintain the highest standards in pharmaceutical manufacturing, research, and development. Our state-of-the-art facilities and rigorous quality control processes ensure that every product meets international safety and efficacy standards.
            </p>
            {navigateToPage && (
              <Button 
                onClick={() => navigateToPage('about-page')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Learn More About Us
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}