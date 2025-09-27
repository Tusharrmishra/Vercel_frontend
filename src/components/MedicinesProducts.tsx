import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
      image: "/src/assets/ProductCatalog.jpg"
    },
    {
      id: 2,
      name: "Augmocil-625",
      image: "/src/assets/Product1.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS",
      image: "/src/assets/Product2.jpg"
    },
    {
      id: 3,
      name: "Vitamaxil-Total",
      image: "/src/assets/Product3.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product4.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product5.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product6.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product7.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product8.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product9.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product10.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product11.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product12.jpg"
    },
    {
      id: 3,
      name: "Augmocil DS Vitamaxil-Total",
      image: "/src/assets/Product13.jpg"
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