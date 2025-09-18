import React, { useState, useEffect } from 'react';
import { ArrowRight, Pill, Droplets, Syringe, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface MedicinesProductsProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function MedicinesProducts({ navigateToPage }: MedicinesProductsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Sample products data (in a real app, this would come from props or API)
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Augmocil-625",
      category: 'antibiotics',
      type: 'Tablets',
      description: "Broad-spectrum antibiotic for respiratory tract infections",
      indication: "Respiratory tract infections, UTI, skin infections",
      dosage: "625mg twice daily",
      packaging: "10x10 Blister",
      strength: "625mg",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGNhcHN1bGVzJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzU1NzgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: "Augmocil DS",
      category: 'antibiotics',
      type: 'Syrup',
      description: "Double strength antibiotic suspension",
      indication: "Pediatric infections, respiratory tract infections",
      dosage: "As directed by physician",
      packaging: "60ml bottle",
      strength: "Double Strength",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-21'
    },
    {
      id: 3,
      name: "Augmocil-DDS",
      category: 'antibiotics',
      type: 'Syrup',
      description: "Double strength antibiotic tablets",
      indication: "Severe bacterial infections",
      dosage: "As prescribed",
      packaging: "10x10 Blister",
      strength: "Double Strength",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-22'
    },
    {
      id: 4,
      name: "Acepedol-MR 4",
      category: 'analgesics',
      type: 'Tablets',
      description: "Modified release pain relief tablet",
      indication: "Chronic pain management",
      dosage: "4mg once daily",
      packaging: "10x10 Blister",
      strength: "4mg MR",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-23'
    },
    {
      id: 5,
      name: "Acepedol-SP",
      category: 'analgesics',
      type: 'Tablets',
      description: "Sustained release pain relief",
      indication: "Moderate to severe pain",
      dosage: "As directed",
      packaging: "10x10 Blister",
      strength: "SR",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-24'
    },
    {
      id: 6,
      name: "Acepedol-P",
      category: 'analgesics',
      type: 'Tablets',
      description: "Regular strength pain relief",
      indication: "Mild to moderate pain",
      dosage: "As needed",
      packaging: "10x10 Blister",
      strength: "Regular",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25'
    },
    {
      id: 7,
      name: "Vitamaxil-Total",
      category: 'supplements',
      type: 'Tablets',
      description: "Complete multivitamin supplement",
      indication: "General wellness and nutrition",
      dosage: "Once daily",
      packaging: "10x10 Blister",
      strength: "Multivitamin",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-21',
      updatedAt: '2024-01-26'
    },
    {
      id: 8,
      name: "Vitamaxil-Tablet",
      category: 'supplements',
      type: 'Tablets',
      description: "Essential vitamin supplement",
      indication: "Daily vitamin supplementation",
      dosage: "Once daily",
      packaging: "10x10 Blister",
      strength: "Standard",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-27'
    },
    {
      id: 9,
      name: "Sunvical-D3",
      category: 'supplements',
      type: 'Tablets',
      description: "Vitamin D3 supplement",
      indication: "Vitamin D deficiency",
      dosage: "As directed",
      packaging: "10x10 Blister",
      strength: "D3",
      image: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBwaWxsc3xlbnwxfHx8fDE3NTU3ODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-23',
      updatedAt: '2024-01-28'
    },
    {
      id: 10,
      name: "Saltofy Syrup",
      category: 'syrups',
      type: 'Syrup',
      description: "Cough and cold relief syrup",
      indication: "Cough and cold symptoms",
      dosage: "5-10ml thrice daily",
      packaging: "100ml bottle",
      strength: "Standard",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-24',
      updatedAt: '2024-01-29'
    },
    {
      id: 11,
      name: "Panogard-DSR",
      category: 'gastrointestinal',
      type: 'Capsules',
      description: "Dual release gastric protection",
      indication: "Acid reflux, gastritis",
      dosage: "Once daily",
      packaging: "10x10 Blister",
      strength: "DSR",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGNhcHN1bGVzJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzU1NzgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-30'
    },
    {
      id: 12,
      name: "Palmodex-DX",
      category: 'respiratory',
      type: 'Syrup',
      description: "Decongestant and expectorant",
      indication: "Respiratory congestion",
      dosage: "Twice daily",
      packaging: "10x10 Blister",
      strength: "DX",
      image: "https://images.unsplash.com/photo-1667058015056-b03fa4974abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NTU3ODEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-26',
      updatedAt: '2024-01-31'
    },
    {
      id: 13,
      name: "Palmodex-LS",
      category: 'respiratory',
      type: 'Syrup',
      description: "Long-acting cough suppressant",
      indication: "Persistent cough",
      dosage: "10ml twice daily",
      packaging: "100ml bottle",
      strength: "LS",
      image: "https://images.unsplash.com/photo-1700104494922-6edd35d95e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBtZWRpY2luZSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc1NTY4NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
      status: 'active',
      createdAt: '2024-01-27',
      updatedAt: '2024-02-01'
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(featuredProducts.length / itemsPerSlide);

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'Tablets':
      case 'Capsules':
        return <Pill className="h-4 w-4" />;
      case 'Syrup':
      case 'Suspension':
        return <Droplets className="h-4 w-4" />;
      case 'Injection':
        return <Syringe className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'antibiotics': return 'bg-red-100 text-red-800';
      case 'analgesics': return 'bg-blue-100 text-blue-800';
      case 'supplements': return 'bg-green-100 text-green-800';
      case 'cardiovascular': return 'bg-purple-100 text-purple-800';
      case 'syrups': return 'bg-orange-100 text-orange-800';
      case 'injectables': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentProducts = () => {
    const start = currentSlide * itemsPerSlide;
    return featuredProducts.slice(start, start + itemsPerSlide);
  };

  return (
    <section id="medicines-products" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Our Featured Medicines & Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality pharmaceutical products, 
            carefully selected to meet diverse healthcare needs with proven efficacy and safety.
          </p>
        </div>

        {/* Product Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="h-10 w-10 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayPause}
                className="h-10 w-10 p-0"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="h-10 w-10 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((product) => (
                        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className={`${getCategoryColor(product.category)} text-xs`}>
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardContent className="p-6">
                            <div className="flex items-center mb-3">
                              {getProductIcon(product.type)}
                              <Badge variant="outline" className="ml-2 text-xs">
                                {product.type}
                              </Badge>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {product.strength}
                              </Badge>
                            </div>
                            
                            <h3 className="text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex justify-between">
                                <span>Indication:</span>
                                <span className="text-right font-medium text-gray-700 max-w-[60%] line-clamp-1">
                                  {product.indication}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dosage:</span>
                                <span className="text-right font-medium text-gray-700">
                                  {product.dosage}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Packaging:</span>
                                <span className="text-right font-medium text-gray-700">
                                  {product.packaging}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-play indicator */}
          {isPlaying && !isHovered && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600 flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>Auto-playing</span>
              </div>
            </div>
          )}

          {/* Hover pause indicator */}
          {isHovered && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600 flex items-center space-x-2">
                <Pause className="w-3 h-3" />
                <span>Paused</span>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Explore our complete product catalog with detailed pharmaceutical information
          </p>
          <Button 
            onClick={() => navigateToPage('products')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}