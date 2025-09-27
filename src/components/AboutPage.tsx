import React from 'react';
import { ArrowLeft, Award, Users, Globe, Target, Eye, Heart, Building, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AboutPageProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function AboutPage({ navigateToPage }: AboutPageProps) {
  const milestones = [
    // { year: '2000', title: 'Company Founded', description: 'Medivance Healthcare established with a vision to provide quality medicines' },
    // { year: '2005', title: 'FDA Approval', description: 'Received first FDA approval for antibiotic formulations' },
    // { year: '2010', title: 'International Expansion', description: 'Started operations in 10 countries across Asia and Africa' },
    // { year: '2015', title: 'Research Center', description: 'Opened state-of-the-art R&D facility for drug development' },
    // { year: '2020', title: 'WHO Certification', description: 'Achieved WHO-GMP certification for all manufacturing facilities' },
    // { year: '2024', title: 'Global Reach', description: 'Now serving patients in over 50 countries worldwide' }
  ];

  const leadership = [
    {
      name: 'Ranjeet Kumar Singh',
      position: 'Chief Executive Officer',
      // experience: '20+ years in pharmaceutical industry',
      // education: 'MD, Harvard Medical School; MBA, Wharton'
    },
    {
      name: 'Ajit Kumar H Singh',
      position: 'Area Sales Manager',
      // experience: '15+ years in drug development',
      // education: 'PhD in Pharmacology, Stanford University'
    },
    // {
    //   name: 'Maria Rodriguez',
    //   position: 'Chief Operating Officer',
    //   experience: '18+ years in pharmaceutical operations',
    //   education: 'MBA, Stanford Graduate School of Business'
    // },
    // {
    //   name: 'Dr. James Wilson',
    //   position: 'Head of Quality Assurance',
    //   experience: '12+ years in pharmaceutical quality',
    //   education: 'PhD in Chemistry, MIT'
    // }
  ];

  const facilities = [
    // {
    //   location: 'United States - Headquarters',
    //   address: '123 Healthcare Blvd, Medical City, MC 12345',
    //   type: 'Corporate Headquarters & R&D Center',
    //   employees: 500
    // },
    // {
    //   location: 'India - Manufacturing',
    //   address: 'Office No. 1309, Master Mind-V, Building Royal Palm, Aarey Milk Colony, Goregaon (East), Mumbai-400 065, India',
    //   type: 'Primary Manufacturing Facility',
    //   // employees: 800
    // },
    // {
    //   location: 'Germany - European Operations',
    //   address: 'Pharmastraße 12, Berlin, Germany',
    //   type: 'European Distribution & Regulatory',
    //   employees: 150
    // },
    // {
    //   location: 'Singapore - Asia Pacific Hub',
    //   address: '88 Biomedical Grove, Singapore 138665',
    //   type: 'Regional Headquarters APAC',
    //   employees: 200
    // }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <h1 className="text-4xl lg:text-5xl mb-6">About Medivance Healthcare</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Two decades of commitment to improving global health through innovative pharmaceutical solutions, 
            trusted by healthcare professionals and patients worldwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To provide safe, effective, and affordable healthcare solutions that improve the quality of life for patients worldwide through innovation, integrity, and excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To be a leading global pharmaceutical company recognized for breakthrough innovations that transform healthcare and create a healthier world for future generations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-600">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Patient-centric approach</li>
                <li>• Scientific excellence</li>
                <li>• Ethical business practices</li>
                <li>• Innovation and quality</li>
                <li>• Global collaboration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Our Story</h2>
          <div className="max-w-4xl mx-auto text-gray-600 space-y-6">
            <p className="text-lg">
              Founded by a team of visionary scientists and healthcare professionals, Medivance Healthcare began with a simple yet powerful mission: to make quality healthcare accessible to everyone, everywhere.
            </p>
            <p>
              What started as a small pharmaceutical company with a handful of essential medicines has grown into a global enterprise serving millions of patients across six continents. Our journey has been marked by continuous innovation, strategic partnerships, and an unwavering commitment to pharmaceutical excellence.
            </p>
            <p>
              Today, we are proud to be one of the world's leading pharmaceutical companies, with a diverse portfolio of over 200 products spanning multiple therapeutic areas. From life-saving antibiotics to essential vitamins and supplements, every product we manufacture undergoes rigorous quality testing to ensure safety and efficacy.
            </p>
            <p>
              Our success is built on the foundation of our people – talented scientists, dedicated healthcare professionals, and passionate individuals who share our vision of creating a healthier world. Together, we continue to push the boundaries of pharmaceutical science, developing innovative solutions for tomorrow's healthcare challenges.
            </p>
          </div>
        </div>

        {/* Company Timeline */}
        {/*<div className="mb-16">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-20">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl text-blue-600 mr-4">{milestone.year}</span>
                      <h3 className="text-lg text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>*/}

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-900">{leader.name}</CardTitle>
                  <CardDescription className="text-blue-600">{leader.position}</CardDescription>
                </CardHeader>
                {/*<CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Experience:</strong> {leader.experience}</p>
                    <p><strong>Education:</strong> {leader.education}</p>
                  </div>
                </CardContent>*/}
              </Card>
            ))}
          </div>
        </div>

        {/* Global Facilities */}
        {/* <div className="mb-16">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Global Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                   {/* <span className="text-sm text-blue-600">{facility.employees} employees</span>*
                  </div>
                  <CardTitle className="text-gray-900">{facility.location}</CardTitle>
                  <CardDescription className="text-blue-600">{facility.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{facility.address}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Company Statistics */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 lg:p-12 text-white">
          <h3 className="text-2xl text-center mb-8">Medivance Healthcare by Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl mb-2">24</div>
              <p className="text-blue-100">Years of Excellence</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl mb-2">50+</div>
              <p className="text-blue-100">Countries Served</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl mb-2">1,650+</div>
              <p className="text-blue-100">Employees Worldwide</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl mb-2">200+</div>
              <p className="text-blue-100">Medical Products</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl mb-2">100M+</div>
              <p className="text-blue-100">Patients Helped</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}