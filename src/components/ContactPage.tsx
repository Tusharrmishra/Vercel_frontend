// ContactPage.tsx  (updated)
import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { appendToSheet } from '../config/googleSheets';

interface ContactPageProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function ContactPage({ navigateToPage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      inquiryType: "",
      subject: "",
      message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({ type: 'idle' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch("https://script.google.com/macros/s/AKfycbyVXHDf-1fHIzicnb4fFk2_j6f4qksKg98Vh8y5OGzc8LkG_4mlFqE-iMKKpQ-Eybeo/exec", {
      method: "POST",
      mode: "no-cors", // required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("✅ Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      inquiryType: "",
      subject: "",
      message: ""
      
      
    });
  } catch (error) {
    console.error(error);
    alert("❌ Error submitting form. Try again.");
  }
};




  const departments = [];
  const offices = [
    {
      address: 'Office No. 1309, Master Mind-V, Building Royal Palm, Aarey Milk Colony, Goregaon East), Mumbai-400 065.',
      phone: '+91 7977692965 /+91 8779723410 /+91 8097167052',
      email: 'medivancehealthcare96@gmail.com',
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
                {/* Inline status */}
                {status.type !== 'idle' && (
                  <Alert className={`mb-4 ${status.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <AlertDescription className={status.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                      {status.message}
                    </AlertDescription>
                  </Alert>
                )}

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
                        // placeholder="1234567890"
                        maxLength={10}
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
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange('country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem> */}
                          <SelectItem value="India">India</SelectItem>
                          {/* <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Inquiry Type *</label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange('inquiryType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Information">General Information</SelectItem>
                          <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                          <SelectItem value="Medical Information">Medical Information</SelectItem>
                          <SelectItem value="Business Partnership">Business Partnership</SelectItem>
                          <SelectItem value="Distribution Opportunity">Distribution Opportunity</SelectItem>
                          <SelectItem value="Adverse Event Reporting">Adverse Event Reporting</SelectItem>
                          <SelectItem value="Quality Complaint">Quality Complaint</SelectItem>
                          <SelectItem value="Regulatory Inquiry">Regulatory Inquiry</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Offices
                </CardTitle>
                <CardDescription>
                  Our offices around the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
