import React from 'react';
import { Microscope, Beaker, Award, Zap } from 'lucide-react';

export function ResearchQuality() {
  const researchAreas = [
    {
      icon: Microscope,
      title: "Advanced Research",
      description: "Cutting-edge pharmaceutical research to develop next-generation treatments."
    },
    {
      icon: Beaker,
      title: "Clinical Trials",
      description: "Rigorous clinical testing to ensure safety and efficacy of all products."
    },
    {
      icon: Award,
      title: "Quality Control",
      description: "Multi-layered quality assurance processes throughout production."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pioneering new drug delivery systems and therapeutic approaches."
    }
  ];

  return (
    <section id="research" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Research & Quality</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Innovation and excellence drive our commitment to advancing healthcare through groundbreaking research and uncompromising quality standards.
            </p>
          </div>

          {/* Research Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {researchAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quality Standards */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 lg:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl text-gray-900 mb-6">Our Quality Standards</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">ISO 9001:2015 Certified</h4>
                      <p className="text-gray-600 text-sm">International quality management system standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">WHO GMP Compliance</h4>
                      <p className="text-gray-600 text-sm">World Health Organization Good Manufacturing Practices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">ICH Guidelines</h4>
                      <p className="text-gray-600 text-sm">International Council for Harmonisation standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">Pharmacovigilance</h4>
                      <p className="text-gray-600 text-sm">Continuous monitoring of drug safety and adverse effects</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-16 w-16 text-white" />
                </div>
                <h4 className="text-xl text-gray-900 mb-2">99.9% Quality Rating</h4>
                <p className="text-gray-600">Based on international audits and certifications</p>
              </div>
            </div>
          </div>

          {/* Innovation Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-blue-600 mb-2">15+</div>
              <h4 className="text-gray-900 mb-2">Active Research Projects</h4>
              <p className="text-gray-600 text-sm">Ongoing studies in various therapeutic areas</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-blue-600 mb-2">50+</div>
              <h4 className="text-gray-900 mb-2">Patents Filed</h4>
              <p className="text-gray-600 text-sm">Innovative formulations and drug delivery systems</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-blue-600 mb-2">$10M+</div>
              <h4 className="text-gray-900 mb-2">R&D Investment</h4>
              <p className="text-gray-600 text-sm">Annual investment in research and development</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}