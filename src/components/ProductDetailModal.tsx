import React from 'react';
import { X, Pill, AlertTriangle, Clock, Users, FileText, Phone, Mail, Download, Printer, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { downloadProductPDF } from './utils/pdfGenerator';

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  // Enhanced product data with additional pharmaceutical information
  const getEnhancedProductData = (product: Product) => {
    const baseData = {
      composition: `Each ${product.type.toLowerCase()} contains ${product.strength} of active ingredient`,
      mechanism: "Acts by inhibiting specific pathways in the body to provide therapeutic effect.",
      pharmacokinetics: {
        absorption: "Well absorbed from the gastrointestinal tract",
        distribution: "Widely distributed throughout body tissues",
        metabolism: "Metabolized in the liver",
        elimination: "Eliminated primarily through kidneys"
      },
      contraindications: [
        "Known hypersensitivity to the active ingredient",
        "Severe liver impairment",
        "Pregnancy and lactation (unless specifically indicated)"
      ],
      warnings: [
        "Use with caution in elderly patients",
        "Monitor for adverse reactions during treatment",
        "Discontinue if severe side effects occur"
      ],
      sideEffects: {
        common: ["Nausea", "Headache", "Dizziness"],
        uncommon: ["Skin rash", "Abdominal pain", "Fatigue"],
        rare: ["Severe allergic reactions", "Liver dysfunction"]
      },
      drugInteractions: [
        "May interact with anticoagulants",
        "Caution with other medications metabolized by liver",
        "Alcohol may increase risk of side effects"
      ],
      storage: "Store in a cool, dry place below 25°C. Protect from light and moisture.",
      shelfLife: "36 months from date of manufacture"
    };

    // Category-specific enhancements
    switch (product.category) {
      case 'antibiotics':
        return {
          ...baseData,
          mechanism: "Inhibits bacterial cell wall synthesis or protein synthesis, leading to bacterial death.",
          warnings: [
            ...baseData.warnings,
            "Complete the full course of treatment",
            "Do not use for viral infections",
            "May cause antibiotic resistance if misused"
          ],
          sideEffects: {
            common: ["Nausea", "Diarrhea", "Stomach upset"],
            uncommon: ["Yeast infections", "Headache", "Dizziness"],
            rare: ["C. difficile colitis", "Severe allergic reactions"]
          }
        };
      
      case 'analgesics':
        return {
          ...baseData,
          mechanism: "Reduces pain and inflammation by inhibiting cyclooxygenase enzymes and prostaglandin synthesis.",
          warnings: [
            ...baseData.warnings,
            "Do not exceed recommended dose",
            "Risk of gastrointestinal bleeding",
            "Monitor blood pressure in hypertensive patients"
          ],
          sideEffects: {
            common: ["Stomach upset", "Nausea", "Heartburn"],
            uncommon: ["Headache", "Dizziness", "Drowsiness"],
            rare: ["GI bleeding", "Kidney problems", "Liver damage"]
          }
        };

      case 'cardiovascular':
        return {
          ...baseData,
          mechanism: "Modulates cardiovascular function through various pathways including calcium channels, ACE inhibition, or cholesterol synthesis.",
          warnings: [
            ...baseData.warnings,
            "Regular monitoring of blood pressure/cholesterol required",
            "Do not stop suddenly without consulting physician",
            "May cause electrolyte imbalances"
          ],
          sideEffects: {
            common: ["Fatigue", "Dizziness", "Muscle pain"],
            uncommon: ["Dry cough", "Swelling", "Palpitations"],
            rare: ["Liver dysfunction", "Severe muscle breakdown"]
          }
        };

      case 'supplements':
        return {
          ...baseData,
          mechanism: "Provides essential nutrients to support normal physiological functions and maintain optimal health.",
          contraindications: [
            "Known hypersensitivity to any ingredient",
            "Certain medical conditions may require dose adjustment"
          ],
          warnings: [
            "Dietary supplements are not intended to diagnose, treat, cure, or prevent disease",
            "Consult healthcare provider before use if pregnant or nursing",
            "Keep out of reach of children"
          ],
          sideEffects: {
            common: ["Mild stomach upset", "Nausea if taken on empty stomach"],
            uncommon: ["Allergic reactions in sensitive individuals"],
            rare: ["Overdose symptoms with excessive intake"]
          }
        };

      default:
        return baseData;
    }
  };

  const enhancedData = getEnhancedProductData(product);

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

  const handleDownloadPDF = async () => {
    await downloadProductPDF(product);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContactMedicalTeam = () => {
    const subject = `Medical Inquiry: ${product.name}`;
    const body = `Hello,\n\nI would like to inquire about ${product.name}.\n\nPlease provide additional medical information.\n\nThank you.`;
    window.location.href = `mailto:medinfo@medivance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1 min-w-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl md:text-2xl text-gray-900 mb-2 pr-8">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base text-gray-600 mb-3">
                  Comprehensive pharmaceutical information and clinical details for {product.name}
                </DialogDescription>
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <Badge className={`${getCategoryColor(product.category)} text-xs`}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.strength}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-4 md:px-6 py-6 overflow-y-auto">
            <Tabs defaultValue="overview" className="w-full">
              {/* Tab Navigation */}
              <div className="sticky top-0 z-10 bg-white pb-4 mb-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 shadow-sm">
                  <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="clinical" className="text-xs md:text-sm">Clinical</TabsTrigger>
                  <TabsTrigger value="safety" className="text-xs md:text-sm">Safety</TabsTrigger>
                  <TabsTrigger value="interactions" className="text-xs md:text-sm">Interactions</TabsTrigger>
                  <TabsTrigger value="technical" className="text-xs md:text-sm">Technical</TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-lg">
                          <Pill className="h-5 w-5 mr-2 text-blue-600" />
                          Product Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 block">Active Ingredient:</span>
                            <p className="text-gray-900 mt-1">{product.name.split(' ')[0]}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Strength:</span>
                            <p className="text-gray-900 mt-1">{product.strength}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Dosage Form:</span>
                            <p className="text-gray-900 mt-1">{product.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Packaging:</span>
                            <p className="text-gray-900 mt-1">{product.packaging}</p>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <span className="text-gray-500 text-sm block">Composition:</span>
                          <p className="text-gray-900 text-sm mt-1">{enhancedData.composition}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-lg">
                          <Users className="h-5 w-5 mr-2 text-green-600" />
                          Therapeutic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <span className="text-gray-500 text-sm block">Indications:</span>
                          <p className="text-gray-900 text-sm mt-1">{product.indication}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm block">Dosage & Administration:</span>
                          <p className="text-gray-900 text-sm mt-1">{product.dosage}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm block">Mechanism of Action:</span>
                          <p className="text-gray-900 text-sm mt-1">{enhancedData.mechanism}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pharmacokinetics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Absorption:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.pharmacokinetics.absorption}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Distribution:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.pharmacokinetics.distribution}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Metabolism:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.pharmacokinetics.metabolism}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Elimination:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.pharmacokinetics.elimination}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Clinical Info Tab */}
                <TabsContent value="clinical" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600 text-lg">Contraindications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          {enhancedData.contraindications.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-900">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-orange-600 text-lg">Warnings & Precautions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          {enhancedData.warnings.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-gray-900">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dosage Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <h4 className="text-gray-900 mb-2">Adults</h4>
                          <p className="text-gray-600">{product.dosage}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-2">Elderly</h4>
                          <p className="text-gray-600">Dose adjustment may be required. Consult physician.</p>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-2">Special Populations</h4>
                          <p className="text-gray-600">Consult healthcare provider for dose modifications.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Safety Tab */}
                <TabsContent value="safety" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600 text-lg">Common Side Effects</CardTitle>
                        <CardDescription>May affect 1 in 10 people</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {enhancedData.sideEffects.common.map((effect, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                              <span className="text-gray-900">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-yellow-600 text-lg">Uncommon Side Effects</CardTitle>
                        <CardDescription>May affect 1 in 100 people</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {enhancedData.sideEffects.uncommon.map((effect, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                              <span className="text-gray-900">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600 text-lg">Rare Side Effects</CardTitle>
                        <CardDescription>May affect 1 in 1000 people</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {enhancedData.sideEffects.rare.map((effect, index) => (
                            <li key={index} className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-900">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 flex items-center text-lg">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Important Safety Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-red-800">
                      <p>If you experience any severe or persistent side effects, stop taking this medication and seek immediate medical attention. Always inform your healthcare provider about all medications you are taking.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Interactions Tab */}
                <TabsContent value="interactions" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Drug Interactions</CardTitle>
                      <CardDescription>Medications that may interact with {product.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        {enhancedData.drugInteractions.map((interaction, index) => (
                          <li key={index} className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-900">{interaction}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Food & Lifestyle</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Food Interactions:</span>
                          <p className="text-gray-900 mt-1">Can be taken with or without food unless otherwise specified.</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Alcohol:</span>
                          <p className="text-gray-900 mt-1">Limit alcohol consumption as it may increase risk of side effects.</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Driving:</span>
                          <p className="text-gray-900 mt-1">May cause dizziness. Avoid driving if affected.</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Special Conditions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Pregnancy:</span>
                          <p className="text-gray-900 mt-1">Consult physician before use during pregnancy.</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Breastfeeding:</span>
                          <p className="text-gray-900 mt-1">May pass into breast milk. Consult physician.</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Kidney/Liver Disease:</span>
                          <p className="text-gray-900 mt-1">Dose adjustment may be required.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Technical Tab */}
                <TabsContent value="technical" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <Clock className="h-5 w-5 mr-2 text-blue-600" />
                          Storage & Handling
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Storage Conditions:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.storage}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Shelf Life:</span>
                          <p className="text-gray-900 mt-1">{enhancedData.shelfLife}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Disposal:</span>
                          <p className="text-gray-900 mt-1">Dispose of unused medication properly. Do not flush down toilet.</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <FileText className="h-5 w-5 mr-2 text-green-600" />
                          Regulatory Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Manufacturer:</span>
                          <p className="text-gray-900 mt-1">Medivance Healthcare Ltd.</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">License Number:</span>
                          <p className="text-gray-900 mt-1">ML-{product.id.toString().padStart(6, '0')}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Manufacturing Date:</span>
                          <p className="text-gray-900 mt-1">See packaging for batch-specific information</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">Need More Information?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-blue-800">
                          <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                          <div>
                            <p>Medical Information Hotline</p>
                            <p>+1-800-MEDINFO (633-4636)</p>
                          </div>
                        </div>
                        <div className="flex items-center text-blue-800">
                          <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                          <div>
                            <p>Email Inquiries</p>
                            <p>medinfo@medivance.com</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              This information is for healthcare professionals and patients. Always consult your physician before starting any medication.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handleDownloadPDF}
              >
                <Download className="h-3 w-3 mr-1" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handlePrint}
              >
                <Printer className="h-3 w-3 mr-1" />
                Print
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-xs"
                onClick={handleContactMedicalTeam}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Contact Medical Team
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}