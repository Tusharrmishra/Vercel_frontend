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

// Generate comprehensive PDF content for products
export const generateProductPDF = async (product: Product) => {
  // Import jsPDF dynamically to avoid SSR issues
  const { jsPDF } = await import('jspdf');
  
  // Enhanced product data for PDF
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

  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // PDF styling constants
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let currentY = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * (fontSize * 0.4));
  };

  // Helper function to add section header
  const addSectionHeader = (title: string, y: number) => {
    doc.setDrawColor(0, 123, 191);
    doc.setFillColor(240, 248, 255);
    doc.rect(margin, y - 5, contentWidth, 10, 'F');
    doc.setTextColor(0, 123, 191);
    return addWrappedText(title, margin + 5, y + 2, contentWidth - 10, 12, true);
  };

  // Helper function to check if new page is needed
  const checkNewPage = (requiredSpace: number) => {
    if (currentY + requiredSpace > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
  };

  // Header with company logo and branding
  doc.setFillColor(3, 2, 19);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MEDIVANCE HEALTHCARE', margin, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Pharmaceutical Product Information', margin, 25);

  currentY = 45;

  // Product title and basic info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(product.name, margin, currentY);
  currentY += 15;

  // Product details box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(margin, currentY, contentWidth, 40);
  
  currentY += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const productDetails = [
    `Active Ingredient: ${product.name.split(' ')[0]}`,
    `Strength: ${product.strength}`,
    `Dosage Form: ${product.type}`,
    `Packaging: ${product.packaging}`,
    `Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
    `License Number: ML-${product.id.toString().padStart(6, '0')}`
  ];

  let detailY = currentY;
  productDetails.forEach((detail, index) => {
    const x = index % 2 === 0 ? margin + 5 : margin + (contentWidth / 2);
    if (index % 2 === 0 && index > 0) detailY += 6;
    doc.text(detail, x, detailY);
  });

  currentY += 45;

  // Composition section
  checkNewPage(25);
  currentY = addSectionHeader('COMPOSITION', currentY);
  currentY = addWrappedText(enhancedData.composition, margin + 5, currentY + 5, contentWidth - 10) + 10;

  // Indications section
  checkNewPage(25);
  currentY = addSectionHeader('THERAPEUTIC INDICATIONS', currentY);
  currentY = addWrappedText(product.indication, margin + 5, currentY + 5, contentWidth - 10) + 10;

  // Mechanism of Action section
  checkNewPage(25);
  currentY = addSectionHeader('MECHANISM OF ACTION', currentY);
  currentY = addWrappedText(enhancedData.mechanism, margin + 5, currentY + 5, contentWidth - 10) + 10;

  // Dosage section
  checkNewPage(35);
  currentY = addSectionHeader('DOSAGE AND ADMINISTRATION', currentY);
  const dosageInfo = [
    `Adults: ${product.dosage}`,
    `Elderly: Dose adjustment may be required. Consult physician.`,
    `Special Populations: Consult healthcare provider for dose modifications.`
  ];
  dosageInfo.forEach(info => {
    currentY = addWrappedText(`• ${info}`, margin + 5, currentY + 5, contentWidth - 10) + 3;
  });
  currentY += 10;

  // Contraindications section
  checkNewPage(40);
  currentY = addSectionHeader('CONTRAINDICATIONS', currentY);
  enhancedData.contraindications.forEach(item => {
    currentY = addWrappedText(`• ${item}`, margin + 5, currentY + 5, contentWidth - 10) + 3;
  });
  currentY += 10;

  // Warnings and Precautions section
  checkNewPage(40);
  currentY = addSectionHeader('WARNINGS AND PRECAUTIONS', currentY);
  enhancedData.warnings.forEach(item => {
    currentY = addWrappedText(`• ${item}`, margin + 5, currentY + 5, contentWidth - 10) + 3;
  });
  currentY += 10;

  // Side Effects section
  checkNewPage(60);
  currentY = addSectionHeader('ADVERSE REACTIONS', currentY);
  
  // Common side effects
  currentY = addWrappedText('Common (may affect 1 in 10 people):', margin + 5, currentY + 5, contentWidth - 10, 10, true) + 5;
  enhancedData.sideEffects.common.forEach(effect => {
    currentY = addWrappedText(`• ${effect}`, margin + 10, currentY + 3, contentWidth - 15) + 2;
  });
  currentY += 5;

  // Uncommon side effects
  currentY = addWrappedText('Uncommon (may affect 1 in 100 people):', margin + 5, currentY, contentWidth - 10, 10, true) + 5;
  enhancedData.sideEffects.uncommon.forEach(effect => {
    currentY = addWrappedText(`• ${effect}`, margin + 10, currentY + 3, contentWidth - 15) + 2;
  });
  currentY += 5;

  // Rare side effects
  currentY = addWrappedText('Rare (may affect 1 in 1000 people):', margin + 5, currentY, contentWidth - 10, 10, true) + 5;
  enhancedData.sideEffects.rare.forEach(effect => {
    currentY = addWrappedText(`• ${effect}`, margin + 10, currentY + 3, contentWidth - 15) + 2;
  });
  currentY += 10;

  // Drug Interactions section
  checkNewPage(40);
  currentY = addSectionHeader('DRUG INTERACTIONS', currentY);
  enhancedData.drugInteractions.forEach(interaction => {
    currentY = addWrappedText(`• ${interaction}`, margin + 5, currentY + 5, contentWidth - 10) + 3;
  });
  currentY += 10;

  // Pharmacokinetics section
  checkNewPage(50);
  currentY = addSectionHeader('PHARMACOKINETICS', currentY);
  const pharmacokineticsInfo = [
    `Absorption: ${enhancedData.pharmacokinetics.absorption}`,
    `Distribution: ${enhancedData.pharmacokinetics.distribution}`,
    `Metabolism: ${enhancedData.pharmacokinetics.metabolism}`,
    `Elimination: ${enhancedData.pharmacokinetics.elimination}`
  ];
  pharmacokineticsInfo.forEach(info => {
    currentY = addWrappedText(`• ${info}`, margin + 5, currentY + 5, contentWidth - 10) + 3;
  });
  currentY += 10;

  // Storage section
  checkNewPage(30);
  currentY = addSectionHeader('STORAGE CONDITIONS', currentY);
  currentY = addWrappedText(`Storage: ${enhancedData.storage}`, margin + 5, currentY + 5, contentWidth - 10) + 5;
  currentY = addWrappedText(`Shelf Life: ${enhancedData.shelfLife}`, margin + 5, currentY, contentWidth - 10) + 10;

  // Important Safety Information
  checkNewPage(40);
  doc.setFillColor(255, 240, 240);
  doc.rect(margin, currentY, contentWidth, 30, 'F');
  doc.setDrawColor(220, 53, 69);
  doc.setLineWidth(1);
  doc.rect(margin, currentY, contentWidth, 30);
  
  currentY += 8;
  doc.setTextColor(220, 53, 69);
  currentY = addWrappedText('IMPORTANT SAFETY INFORMATION', margin + 5, currentY, contentWidth - 10, 12, true) + 5;
  doc.setTextColor(0, 0, 0);
  currentY = addWrappedText('If you experience any severe or persistent side effects, stop taking this medication and seek immediate medical attention. Always inform your healthcare provider about all medications you are taking.', margin + 5, currentY, contentWidth - 10) + 15;

  // Manufacturer Information
  checkNewPage(40);
  currentY = addSectionHeader('MANUFACTURER INFORMATION', currentY);
  const manufacturerInfo = [
    'Medivance Healthcare Ltd.',
    `License Number: ML-${product.id.toString().padStart(6, '0')}`,
    'Manufacturing Date: See packaging for batch-specific information',
    '',
    'Medical Information Hotline: +1-800-MEDINFO (633-4636)',
    'Email: medinfo@medivance.com',
    'Website: www.medivancehealthcare.com'
  ];
  manufacturerInfo.forEach(info => {
    if (info) {
      currentY = addWrappedText(info, margin + 5, currentY + 5, contentWidth - 10) + 3;
    } else {
      currentY += 5;
    }
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`This leaflet was last updated: ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
    doc.text('Always consult your physician before starting any medication.', margin, pageHeight - 6);
  }

  return doc;
};

// Download PDF function
export const downloadProductPDF = async (product: Product) => {
  try {
    const doc = await generateProductPDF(product);
    const fileName = `${product.name.replace(/\s+/g, '_')}_Product_Information.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Sorry, there was an error generating the PDF. Please try again.');
  }
};