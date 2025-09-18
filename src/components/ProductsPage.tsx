import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Pill, Droplets, Syringe, Download, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductDetailModal } from './ProductDetailModal';
import { ScrollToTop } from './ScrollToTop';
import { downloadProductLeaflet } from './utils/leafletGenerator';

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
}

interface ProductsPageProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function ProductsPage({ navigateToPage }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allProducts: Product[] = [
    // New Products
    { 
      id: 123, 
      name: "Vitamaxil-Total", 
      category: 'supplements', 
      type: 'Tablets', 
      description: "Complete multivitamin and mineral supplement",
      indication: "General health maintenance, nutritional support",
      dosage: "1 tablet daily",
      packaging: "10x10 Blister",
      strength: "Multi",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 124, 
      name: "Acepedol-MR 4", 
      category: 'analgesics', 
      type: 'Tablets', 
      description: "Modified release pain relief tablet",
      indication: "Moderate to severe pain",
      dosage: "1 tablet every 4-6 hours",
      packaging: "10x10 Blister",
      strength: "4mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 125, 
      name: "Panogard-DSR", 
      category: 'cardiovascular', 
      type: 'Capsules', 
      description: "Delayed release gastric protection capsule",
      indication: "Acid reflux, gastric protection",
      dosage: "1 capsule daily",
      packaging: "10x10 Blister",
      strength: "40mg",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGNhcHN1bGVzJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzU1NzgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 126, 
      name: "Acepedol-SP", 
      category: 'analgesics', 
      type: 'Tablets', 
      description: "Strong pain relief tablet",
      indication: "Severe pain management",
      dosage: "1 tablet as needed",
      packaging: "10x10 Blister",
      strength: "8mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 127, 
      name: "Sunvical-D3", 
      category: 'supplements', 
      type: 'Tablets', 
      description: "Vitamin D3 supplement",
      indication: "Vitamin D deficiency",
      dosage: "1 tablet daily",
      packaging: "10x10 Blister",
      strength: "1000 IU",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 128, 
      name: "Acepedol-P", 
      category: 'analgesics', 
      type: 'Tablets', 
      description: "Paracetamol-based pain relief",
      indication: "Mild to moderate pain",
      dosage: "1-2 tablets every 4-6 hours",
      packaging: "10x10 Blister",
      strength: "500mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 129, 
      name: "Saltofy Syrup", 
      category: 'syrups', 
      type: 'Syrup', 
      description: "Cough relief syrup",
      indication: "Cough and cold symptoms",
      dosage: "10ml three times daily",
      packaging: "100ml bottle",
      strength: "100mg/5ml",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 130, 
      name: "Palmodex-DX", 
      category: 'syrups', 
      type: 'Syrup', 
      description: "Cough suppressant and decongestant",
      indication: "Cough and nasal congestion",
      dosage: "5-10ml three times daily",
      packaging: "100ml bottle",
      strength: "Multi",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 131, 
      name: "Augmocil-DDS", 
      category: 'antibiotics', 
      type: 'Tablets', 
      description: "Double strength antibiotic combination",
      indication: "Severe bacterial infections",
      dosage: "1 tablet twice daily",
      packaging: "10x10 Blister",
      strength: "625mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 132, 
      name: "Palmodex-LS", 
      category: 'syrups', 
      type: 'Syrup', 
      description: "Levosalbutamol syrup for respiratory relief",
      indication: "Bronchial asthma, bronchitis",
      dosage: "5ml twice daily",
      packaging: "100ml bottle",
      strength: "1mg/5ml",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 133, 
      name: "Augmocil DS", 
      category: 'antibiotics', 
      type: 'Tablets', 
      description: "Double strength amoxicillin combination",
      indication: "Moderate to severe bacterial infections",
      dosage: "1 tablet twice daily",
      packaging: "10x10 Blister",
      strength: "500mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 134, 
      name: "Augmocil-625", 
      category: 'antibiotics', 
      type: 'Tablets', 
      description: "High-strength antibiotic combination",
      indication: "Severe bacterial infections",
      dosage: "1 tablet twice daily",
      packaging: "10x10 Blister",
      strength: "625mg",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      id: 135, 
      name: "Vitamaxil-Tablet", 
      category: 'supplements', 
      type: 'Tablets', 
      description: "Essential vitamin and mineral supplement",
      indication: "Daily nutritional support",
      dosage: "1 tablet daily",
      packaging: "10x10 Blister",
      strength: "Multi",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'analgesics', label: 'Pain Management' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'syrups', label: 'Syrups & Liquids' },
    { value: 'injectables', label: 'Injectables' },
    { value: 'gastrointestinal', label: 'Gastrointestinal' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'Tablets', label: 'Tablets' },
    { value: 'Capsules', label: 'Capsules' },
    { value: 'Syrup', label: 'Syrups' },
    { value: 'Suspension', label: 'Suspensions' },
    { value: 'Injection', label: 'Injections' }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'Tablets': return <Pill className="h-5 w-5 text-blue-600" />;
      case 'Capsules': return <Pill className="h-5 w-5 text-blue-600" />;
      case 'Syrup':
      case 'Suspension': return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'Injection': return <Syringe className="h-5 w-5 text-blue-600" />;
      default: return <Pill className="h-5 w-5 text-blue-600" />;
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDownloadLeaflet = (product: Product) => {
    downloadProductLeaflet(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Product Catalog</h1>
              <p className="text-gray-600">Comprehensive pharmaceutical product information</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getProductIcon(product.type)}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {product.type}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.strength}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-gray-900 leading-tight">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Indication:</span>
                    <span className="text-gray-900 text-right text-xs">{product.indication}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Dosage:</span>
                    <span className="text-gray-900 text-right text-xs">{product.dosage}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500">Packaging:</span>
                    <span className="text-gray-900 text-right text-xs">{product.packaging}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(product)}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownloadLeaflet(product)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Leaflet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}