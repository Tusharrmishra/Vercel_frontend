import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductCatalog from '../assets/ProductCatalog.jpg';
import Product1 from '../assets/Product1.jpg';
import Product2 from '../assets/Product2.jpg';
import Product3 from '../assets/Product3.jpg';
import Product4 from '../assets/Product4.jpg';  
import Product5 from '../assets/Product5.jpg';
import Product6 from '../assets/Product6.jpg';
import Product7 from '../assets/Product7.jpg';
import Product8 from '../assets/Product8.jpg';
import Product9 from '../assets/Product9.jpg';
import Product10 from '../assets/Product10.jpg';
import Product11 from '../assets/Product11.jpg';
import Product12 from '../assets/Product12.jpg';
import Product13 from '../assets/Product13.jpg';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface MedicinesProductsProps {
  navigateToPage: (page: 'home' | 'products' | 'about-page' | 'contact-page') => void;
}

export function MedicinesProducts({ navigateToPage }: MedicinesProductsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Simplified products data with only necessary fields
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Catalog",
      image: ProductCatalog
    },
    {
      id: 2,
      name: "Augmocil-625",
      image: Product1
    },
    {
      id: 3,
      name: "Augmocil DS",
      image: Product2
    },
    {
      id: 3,
      name: "Vitamaxil-Total",
      image: Product3
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product4
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product5
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product6
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product7
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product8
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product9
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product10
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product11
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product12
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: Product13
    }
  ];

  const itemsPerSlide = 1; // Show only one product at a time
  const totalSlides = featuredProducts.length;

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

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

  return (
    <section id="medicines-products" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Our Featured Medicines & Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality pharmaceutical products.
          </p>
        </div>

        {/* Product Carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
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
              {featuredProducts.map((_, index) => (
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

          {/* Products Slider */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <Card key={product.id} className="w-full flex-shrink-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Card>
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