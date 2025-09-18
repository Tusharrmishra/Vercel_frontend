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

export const generateProductLeaflet = (product: Product) => {
  // Enhanced product data for leaflet
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

  // Generate comprehensive leaflet content
  const leafletContent = `
PATIENT INFORMATION LEAFLET
${product.name}
Medivance Healthcare Ltd.

═══════════════════════════════════════════════════════════════

PRODUCT INFORMATION
═══════════════════════════════════════════════════════════════
Product Name: ${product.name}
Active Ingredient: ${product.name.split(' ')[0]}
Strength: ${product.strength}
Dosage Form: ${product.type}
Packaging: ${product.packaging}
Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}

COMPOSITION
═══════════════════════════════════════════════════════════════
${enhancedData.composition}

THERAPEUTIC INDICATIONS
═══════════════════════════════════════════════════════════════
${product.indication}

MECHANISM OF ACTION
═══════════════════════════════════════════════════════════════
${enhancedData.mechanism}

DOSAGE AND ADMINISTRATION
═══════════════════════════════════════════════════════════════
Adults: ${product.dosage}
Elderly: Dose adjustment may be required. Consult physician.
Special Populations: Consult healthcare provider for dose modifications.

CONTRAINDICATIONS
═══════════════════════════════════════════════════════════════
${enhancedData.contraindications.map(item => `• ${item}`).join('\n')}

WARNINGS AND PRECAUTIONS
═══════════════════════════════════════════════════════════════
${enhancedData.warnings.map(item => `• ${item}`).join('\n')}

SIDE EFFECTS
═══════════════════════════════════════════════════════════════
Common (may affect 1 in 10 people):
${enhancedData.sideEffects.common.map(effect => `• ${effect}`).join('\n')}

Uncommon (may affect 1 in 100 people):
${enhancedData.sideEffects.uncommon.map(effect => `• ${effect}`).join('\n')}

Rare (may affect 1 in 1000 people):
${enhancedData.sideEffects.rare.map(effect => `• ${effect}`).join('\n')}

DRUG INTERACTIONS
═══════════════════════════════════════════════════════════════
${enhancedData.drugInteractions.map(interaction => `• ${interaction}`).join('\n')}

PHARMACOKINETICS
═══════════════════════════════════════════════════════════════
Absorption: ${enhancedData.pharmacokinetics.absorption}
Distribution: ${enhancedData.pharmacokinetics.distribution}
Metabolism: ${enhancedData.pharmacokinetics.metabolism}
Elimination: ${enhancedData.pharmacokinetics.elimination}

STORAGE CONDITIONS
═══════════════════════════════════════════════════════════════
${enhancedData.storage}
Shelf Life: ${enhancedData.shelfLife}

IMPORTANT SAFETY INFORMATION
═══════════════════════════════════════════════════════════════
• If you experience any severe or persistent side effects, stop taking this 
  medication and seek immediate medical attention.
• Always inform your healthcare provider about all medications you are taking.
• Do not share this medication with others.
• Keep out of reach of children.

DISPOSAL
═══════════════════════════════════════════════════════════════
Dispose of unused medication properly. Do not flush down toilet.
Return to pharmacy or follow local disposal guidelines.

MANUFACTURER INFORMATION
═══════════════════════════════════════════════════════════════
Medivance Healthcare Ltd.
License Number: ML-${product.id.toString().padStart(6, '0')}
Manufacturing Date: See packaging for batch-specific information

CONTACT INFORMATION
═══════════════════════════════════════════════════════════════
Medical Information Hotline: +1-800-MEDINFO (633-4636)
Email: medinfo@medivance.com
Website: www.medivancehealthcare.com

═══════════════════════════════════════════════════════════════
This leaflet was last updated: ${new Date().toLocaleDateString()}
Always consult your physician before starting any medication.
═══════════════════════════════════════════════════════════════
`;

  return leafletContent;
};

export const downloadProductLeaflet = (product: Product) => {
  const leafletContent = generateProductLeaflet(product);
  const blob = new Blob([leafletContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${product.name.replace(/\s+/g, '_')}_Leaflet.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};