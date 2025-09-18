import React, { useState } from 'react';
import { Stethoscope, Users, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function DoctorsPatients() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const resources = [
    {
      icon: Stethoscope,
      title: "For Healthcare Professionals",
      description: "Access prescribing information, clinical data, and professional resources.",
      items: ["Drug Information Sheets", "Clinical Trial Data", "Prescribing Guidelines", "Medical Education"]
    },
    {
      icon: Users,
      title: "For Patients",
      description: "Patient education materials, medication guides, and support resources.",
      items: ["Medication Guides", "Patient Education", "Side Effect Information", "Support Programs"]
    }
  ];

  const faqs = [
    {
      question: "How do I know if a Medivance product is right for me?",
      answer: "Always consult with your healthcare provider before starting any new medication. They can assess your medical history, current conditions, and other medications to determine the best treatment option for you."
    },
    {
      question: "Are Medivance products available internationally?",
      answer: "Yes, our products are available in over 50 countries worldwide. Availability may vary by region due to local regulatory requirements. Contact your local pharmacy or healthcare provider for specific product availability."
    },
    {
      question: "What should I do if I experience side effects?",
      answer: "If you experience any adverse effects, stop taking the medication and contact your healthcare provider immediately. You can also report side effects to our pharmacovigilance team through our contact form."
    },
    {
      question: "How are Medivance products tested for safety?",
      answer: "All our products undergo rigorous testing including preclinical studies, multiple phases of clinical trials, and continuous post-market surveillance to ensure safety and efficacy."
    },
    {
      question: "Can I get samples of Medivance products?",
      answer: "Healthcare professionals can request product samples through our medical information department. Patients should speak with their healthcare provider about sample availability."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Doctors & Patients</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive resources and support for healthcare professionals and patients to ensure safe and effective use of our products.
            </p>
          </div>

          {/* Resources Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">{resource.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="mr-2 h-4 w-4" />
                      Access Resources
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-16">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">!</span>
              </div>
              <h3 className="text-red-900">Medical Emergency Information</h3>
            </div>
            <p className="text-red-800 mb-4">
              If you are experiencing a medical emergency, please call your local emergency services immediately. 
              For urgent medication-related questions outside of business hours, contact our 24/7 medical information hotline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Emergency Hotline: 1-800-MEDIVANCE
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Poison Control: 1-800-222-1222
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600">Find answers to common questions about our products and services.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Medical Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}