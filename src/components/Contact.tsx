import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Contact() {
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 7977692965 /+91 8779723410 /+91 8097167052",
      // subtext: "Mon-Fri: 8AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "medivancehealthcare96@gmail.com",
      subtext: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Office No. 1309, Master Mind-V, Building Royal Palm, Aarey Milk Colony, Goregaon East), Mumbai-400 065.",
      subtext: "India"
    },
    // {
    //   icon: Clock,
    //   title: "Business Hours",
    //   details: "Monday - Friday: 8:00 AM - 6:00 PM",
    //   subtext: "Eastern Standard Time"
    // }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for inquiries about our products, services, or partnership opportunities. We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
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
                        <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Information</SelectItem>
                            <SelectItem value="product">Product Inquiry</SelectItem>
                            <SelectItem value="medical">Medical Information</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="adverse">Adverse Event Reporting</SelectItem>
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
                        placeholder="Please provide details about your inquiry..."
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
              <h3 className="text-xl text-gray-900 mb-6">Get in Touch</h3>
              
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start p-6 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-gray-700 mb-1">{info.details}</p>
                      <p className="text-gray-600 text-sm">{info.subtext}</p>
                    </div>
                  </div>
                );
              })}

              {/* Emergency Contact */}
              {/* <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-red-900 mb-2">Emergency Medical Information</h4>
                <p className="text-red-800 text-sm mb-3">
                  For urgent medical questions about our products:
                </p>
                <p className="text-red-900">24/7 Hotline: 1-800-MEDIVANCE</p>
                <p className="text-red-700 text-sm mt-2">
                  For life-threatening emergencies, call 911 immediately.
                </p>
              </div> */}

              {/* Office Hours */}
              {/* <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-gray-900 mb-3">Customer Service Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="text-gray-900">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="text-gray-900">9:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}