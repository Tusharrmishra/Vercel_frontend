import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface ContactPageProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function ContactPage({ navigateToPage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: '',
    country: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await fetch('https://www.medivancehealthcare.in/submit_contact', {
      const response = await fetch('http://localhost:5000/submit_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Thank you for your inquiry. We will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: '',
          country: ''
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to submit form. Please try again later.');
      console.error('Error:', error);
    }
  };

  const departments = [
    // { name: 'Medical Information', phone: '+1 (800) 123-4567', email: 'medical@medivance.com', description: 'Product information and medical inquiries' },
    // { name: 'Customer Service', phone: '+1 (800) 123-4568', email: 'service@medivance.com', description: 'General customer support and orders' },
    // { name: 'Business Development', phone: '+1 (800) 123-4569', email: 'business@medivance.com', description: 'Partnerships and distribution opportunities' },
    // { name: 'Pharmacovigilance', phone: '+1 (800) 123-4570', email: 'safety@medivance.com', description: 'Adverse event reporting and drug safety' },
    // { name: 'Regulatory Affairs', phone: '+1 (800) 123-4571', email: 'regulatory@medivance.com', description: 'Regulatory compliance and submissions' },
    // { name: 'Quality Assurance', phone: '+1 (800) 123-4572', email: 'quality@medivance.com', description: 'Quality complaints and product issues' }
  ];

  const offices = [
    // {
    //   region: 'North America',
    //   address: '123 Healthcare Blvd, Medical City, MC 12345, United States',
    //   phone: '+1 (800) MEDIVANCE',
    //   email: 'info@medivance.com',
    //   hours: 'Mon-Fri: 8:00 AM - 6:00 PM EST'
    // },
    // {
    //   region: 'Europe',
    //   address: 'Pharmastraße 12, 10115 Berlin, Germany',
    //   phone: '+49 30 12345678',
    //   email: 'europe@medivance.com',
    //   hours: 'Mon-Fri: 9:00 AM - 5:00 PM CET'
    // },
    // {
    //   region: 'Asia Pacific',
    //   address: '88 Biomedical Grove, Singapore 138665',
    //   phone: '+65 6123 4567',
    //   email: 'apac@medivance.com',
    //   hours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT'
    // },
    {
      region: 'India',
      address: 'Office No. 1309, Master Mind-V, Building Royal Palm, Aarey Milk Colony, Goregaon East), Mumbai-400 065.',
      phone: '+91 7977692965 /+91 8779723410 /+91 8097167052',
      email: 'medivancehealthcare96@gmail.com',
      // hours: 'Mon-Fri: 9:30 AM - 6:30 PM IST'
    } 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <h1 className="text-4xl lg:text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Get in touch with our team for any inquiries, support needs, or partnership opportunities. 
            We're here to help you with all your pharmaceutical needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Emergency Contact Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Medical Emergency:</strong> For life-threatening emergencies, call 911 immediately. 
            For urgent medication-related questions: <strong>24/7 Hotline: 1-800-MEDIVANCE</strong>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and our team will respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Company/Organization</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Country *</label>
                      <Select onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Inquiry Type *</label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Information</SelectItem>
                          <SelectItem value="product">Product Inquiry</SelectItem>
                          <SelectItem value="medical">Medical Information</SelectItem>
                          <SelectItem value="business">Business Partnership</SelectItem>
                          <SelectItem value="distribution">Distribution Opportunity</SelectItem>
                          <SelectItem value="adverse">Adverse Event Reporting</SelectItem>
                          <SelectItem value="quality">Quality Complaint</SelectItem>
                          <SelectItem value="regulatory">Regulatory Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Subject *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief subject of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Department Contacts */}
            {/* <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Department Contacts
                </CardTitle>
                <CardDescription>
                  Direct contact information for specific departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="text-gray-900 mb-1">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="text-blue-600">{dept.phone}</span>
                        <span className="hidden sm:block text-gray-400">•</span>
                        <span className="text-blue-600">{dept.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Global Offices */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Global Offices
                </CardTitle>
                <CardDescription>
                  Our offices around the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="text-gray-900 mb-2">{office.region}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span>{office.email}</span>
                        </div>
                        {/* <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span>{office.hours}</span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
             {/*<Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                 <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Product Catalog
                  </Button>
                   <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Product Samples
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule a Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report Adverse Event
                  </Button>
                </div>
              </CardContent>
            </Card>*/}
          </div>
        </div>
      </div>
    </div>
  );
}