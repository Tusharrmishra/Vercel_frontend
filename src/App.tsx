import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MedicinesProducts } from './components/MedicinesProducts';
import { ResearchQuality } from './components/ResearchQuality';
import { DoctorsPatients } from './components/DoctorsPatients';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductsPage } from './components/ProductsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ScrollToTop } from './components/ScrollToTop';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductsManagement } from './components/admin/ProductsManagement';
import { MessagesManagement } from './components/admin/MessagesManagement';
import { CompanyManagement } from './components/admin/CompanyManagement';

type PageType = 'home' | 'products' | 'about-page' | 'contact-page' | 'admin';
type AdminPageType = 'dashboard' | 'products' | 'messages' | 'company' | 'users' | 'settings';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  description: string;
  indication: string;
  dosage: string;
  packaging: string;
  strength: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface CompanyInfo {
  mission: string;
  vision: string;
  values: string[];
  story: string;
}

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
}

interface Facility {
  id: number;
  location: string;
  address: string;
  type: string;
  employees: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentAdminPage, setCurrentAdminPage] = useState<AdminPageType>('dashboard');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');

  // Enhanced product data with more comprehensive pharmaceutical products
  const [products, setProducts] = useState<Product[]>([
    // Antibiotics
    {
      id: 1,
      name: " Augmocil 625mg",
      category: 'antibiotics',
      type: 'Capsules',
      description: "Broad-spectrum antibiotic for respiratory tract infections",
      indication: "Respiratory tract infections, UTI, skin infections",
      dosage: "500mg twice daily",
      packaging: "10x10 Blister",
      strength: "500mg",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGNhcHN1bGVzJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzU1NzgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: "Azithromycin 250mg",
      category: 'antibiotics',
      type: 'Tablets',
      description: "Macrolide antibiotic for bacterial infections",
      indication: "Respiratory infections, sexually transmitted infections",
      dosage: "250mg once daily for 5 days",
      packaging: "6 Tablets Blister",
      strength: "250mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: "Ciprofloxacin 500mg",
      category: 'antibiotics',
      type: 'Tablets',
      description: "Fluoroquinolone antibiotic for urinary tract infections",
      indication: "UTI, prostatitis, gastroenteritis",
      dosage: "500mg twice daily",
      packaging: "10x10 Blister",
      strength: "500mg",
      image: "https://images.unsplash.com/photo-1612540943832-09d119939e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpYmlvdGljcyUyMG1lZGljaW5lJTIwYmxpc3RlcnxlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-19'
    },
    
    // Pain Management
    {
      id: 21,
      name: "Ibuprofen 400mg",
      category: 'analgesics',
      type: 'Tablets',
      description: "NSAID for pain and inflammation relief",
      indication: "Pain, fever, inflammation",
      dosage: "400mg 3-4 times daily",
      packaging: "10x10 Blister",
      strength: "400mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 22,
      name: "Paracetamol 500mg",
      category: 'analgesics',
      type: 'Tablets',
      description: "Analgesic and antipyretic for pain and fever",
      indication: "Pain, fever",
      dosage: "500mg 4-6 times daily",
      packaging: "10x10 Blister",
      strength: "500mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3hlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    },

    // Supplements
    {
      id: 41,
      name: "Vitamin D3 1000 IU",
      category: 'supplements',
      type: 'Tablets',
      description: "Essential vitamin for bone health and immunity",
      indication: "Vitamin D deficiency, bone health",
      dosage: "1000 IU daily",
      packaging: "10x3 Blister",
      strength: "1000 IU",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: "Omega-3 Fish Oil 1000mg",
      category: 'supplements',
      type: 'Capsules',
      description: "EPA and DHA for heart and brain health",
      indication: "Cardiovascular health, brain function",
      dosage: "1000mg daily",
      packaging: "10x3 Blister",
      strength: "1000mg",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13'
    },

    // Cardiovascular
    {
      id: 61,
      name: "Amlodipine 5mg",
      category: 'cardiovascular',
      type: 'Tablets',
      description: "Calcium channel blocker for hypertension",
      indication: "Hypertension, angina",
      dosage: "5mg once daily",
      packaging: "10x10 Blister",
      strength: "5mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3hlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-07',
      updatedAt: '2024-01-17'
    },

    // Syrups
    {
      id: 101,
      name: "Paracetamol Syrup 120mg/5ml",
      category: 'syrups',
      type: 'Syrup',
      description: "Pediatric pain and fever relief",
      indication: "Pediatric pain and fever",
      dosage: "5-10ml 3-4 times daily",
      packaging: "60ml bottle",
      strength: "120mg/5ml",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-19'
    },

    // Injectables
    {
      id: 121,
      name: "Insulin Glargine 100 Units/ml",
      category: 'injectables',
      type: 'Injection',
      description: "Long-acting insulin for diabetes management",
      indication: "Type 1 and Type 2 diabetes",
      dosage: "As prescribed by physician",
      packaging: "10ml vial",
      strength: "100 Units/ml",
      image: "https://images.unsplash.com/photo-1746017090180-ebb14a589639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaW5qZWN0aW9uJTIwc3lyaW5nZXxlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: 'active',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-21'
    }
  ]);

  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      phone: "+1 (555) 123-4567",
      company: "City General Hospital",
      country: "United States",
      inquiryType: "product",
      subject: "Bulk Order Inquiry for Antibiotics",
      message: "Hello, I'm interested in placing a bulk order for amoxicillin and other antibiotics for our hospital. Please provide pricing and availability information.",
      status: 'unread',
      priority: 'high',
      createdAt: '2024-01-21',
      updatedAt: '2024-01-21'
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@pharmatech.com",
      phone: "+1 (555) 987-6543",
      company: "PharmaTech Solutions",
      country: "Canada",
      inquiryType: "business",
      subject: "Partnership Opportunity",
      message: "We are interested in exploring a distribution partnership for your pharmaceutical products in the Canadian market. Could we schedule a meeting to discuss this opportunity?",
      status: 'read',
      priority: 'medium',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-21'
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      email: "maria.rodriguez@clinic.com",
      phone: "+1 (555) 456-7890",
      company: "Community Health Clinic",
      country: "Mexico",
      inquiryType: "medical",
      subject: "Product Information Request",
      message: "Could you please provide detailed medical information about your cardiovascular medications? I need comprehensive data for patient consultations.",
      status: 'unread',
      priority: 'medium',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-19'
    }
  ]);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    mission: "To provide safe, effective, and affordable healthcare solutions that improve the quality of life for patients worldwide through innovation, integrity, and excellence.",
    vision: "To be a leading global pharmaceutical company recognized for breakthrough innovations that transform healthcare and create a healthier world for future generations.",
    values: [
      "Patient-centric approach",
      "Scientific excellence", 
      "Ethical business practices",
      "Innovation and quality",
      "Global collaboration"
    ],
    story: "Founded in 2000 by a team of visionary scientists and healthcare professionals, Medivance Healthcare began with a simple yet powerful mission: to make quality healthcare accessible to everyone, everywhere."
  });

  const [leadership, setLeadership] = useState<LeadershipMember[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Chief Executive Officer",
      experience: "20+ years in pharmaceutical industry",
      education: "MD, Harvard Medical School; MBA, Wharton"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      position: "Chief Scientific Officer", 
      experience: "15+ years in drug development",
      education: "PhD in Pharmacology, Stanford University"
    }
  ]);

  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: 1,
      location: "United States - Headquarters",
      address: "123 Healthcare Blvd, Medical City, MC 12345, United States",
      type: "Corporate Headquarters & R&D Center",
      employees: 500
    },
    {
      id: 2,
      location: "India - Manufacturing",
      address: "Plot 45, Pharma Park, Hyderabad, India",
      type: "Primary Manufacturing Facility",
      employees: 800
    }
  ]);

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Admin functions
  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Simple demo authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      setCurrentPage('admin');
    } else {
      setAdminLoginError('Invalid credentials. Use username: admin, password: admin123');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    setCurrentAdminPage('dashboard');
  };

  // CRUD operations for products
  const handleCreateProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : product
    ));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // CRUD operations for messages
  const handleUpdateMessage = (id: number, updates: Partial<ContactMessage>) => {
    setMessages(prev => prev.map(message =>
      message.id === id
        ? { ...message, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : message
    ));
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const handleReplyMessage = (id: number, reply: string) => {
    // In a real app, this would send an email reply
    console.log(`Reply to message ${id}: ${reply}`);
  };

  // Admin page routing
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} error={adminLoginError} />;
    }

    const dashboardStats = {
      totalProducts: products.length,
      totalMessages: messages.filter(m => m.status === 'unread').length,
      totalCategories: [...new Set(products.map(p => p.category))].length,
      activeUsers: 24 // Mock data
    };

    const renderAdminPage = () => {
      switch (currentAdminPage) {
        case 'dashboard':
          return <AdminDashboard stats={dashboardStats} />;
        case 'products':
          return (
            <ProductsManagement
              products={products}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          );
        case 'messages':
          return (
            <MessagesManagement
              messages={messages}
              onUpdateMessage={handleUpdateMessage}
              onDeleteMessage={handleDeleteMessage}
              onReplyMessage={handleReplyMessage}
            />
          );
        case 'company':
          return (
            <CompanyManagement
              companyInfo={companyInfo}
              leadership={leadership}
              facilities={facilities}
              onUpdateCompanyInfo={setCompanyInfo}
              onUpdateLeadership={setLeadership}
              onUpdateFacilities={setFacilities}
            />
          );
        default:
          return <AdminDashboard stats={dashboardStats} />;
      }
    };

    return (
      <AdminLayout
        currentPage={currentAdminPage}
        onPageChange={setCurrentAdminPage}
        onLogout={handleAdminLogout}
      >
        {renderAdminPage()}
        <ScrollToTop />
      </AdminLayout>
    );
  }

  // Add admin access link to header
  const headerProps = {
    navigateToPage: (page: PageType) => {
      if (page === 'admin') {
        setCurrentPage('admin');
      } else {
        navigateToPage(page);
      }
    }
  };

  // Regular website routing
  if (currentPage === 'products') {
    return (
      <div className="min-h-screen bg-white">
        <Header navigateToPage={headerProps.navigateToPage} />
        <ProductsPage navigateToPage={navigateToPage} />
        <Footer navigateToPage={navigateToPage} />
        <ScrollToTop />
      </div>
    );
  }

  if (currentPage === 'about-page') {
    return (
      <div className="min-h-screen bg-white">
        <Header navigateToPage={headerProps.navigateToPage} />
        <AboutPage navigateToPage={navigateToPage} />
        <Footer navigateToPage={navigateToPage} />
        <ScrollToTop />
      </div>
    );
  }

  if (currentPage === 'contact-page') {
    return (
      <div className="min-h-screen bg-white">
        <Header navigateToPage={headerProps.navigateToPage} />
        <ContactPage navigateToPage={navigateToPage} />
        <Footer navigateToPage={navigateToPage} />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigateToPage={headerProps.navigateToPage} />
      <Hero navigateToPage={navigateToPage} />
      <About navigateToPage={navigateToPage} />
      <MedicinesProducts navigateToPage={navigateToPage} />
      <ResearchQuality />
      <DoctorsPatients />
      <Contact />
      <Footer navigateToPage={navigateToPage} />
      <ScrollToTop />
    </div>
  );
}