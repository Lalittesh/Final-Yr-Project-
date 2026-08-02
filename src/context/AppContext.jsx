import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const initialScans = [
  {
    id: 'scan_1',
    productName: 'Parle-G Gold Biscuits (100g)',
    timestamp: '2026-08-02T14:15:00.000Z',
    status: 'COMPLIANT',
    confidence: '99.8%',
    complianceScore: 100,
    fields: {
      mrp: { value: '₹10.00', compliant: true, rule: 'Declared including all taxes' },
      netQty: { value: '100g', compliant: true, rule: 'Declared clearly on front display panel' },
      manufacturer: { value: 'Parle Products Pvt. Ltd.', compliant: true, rule: 'Complete name & address present' },
      unitSalePrice: { value: '₹0.10 per g', compliant: true, rule: 'Declared near MRP' },
      dateOfMfg: { value: '06/2026', compliant: true, rule: 'Proper format MM/YYYY' },
    },
    issues: []
  },
  {
    id: 'scan_2',
    productName: 'Delight Organic Honey (250g)',
    timestamp: '2026-08-02T10:30:00.000Z',
    status: 'NON_COMPLIANT',
    confidence: '97.5%',
    complianceScore: 60,
    fields: {
      mrp: { value: '₹350.00', compliant: true, rule: 'Declared' },
      netQty: { value: '250g', compliant: true, rule: 'Declared' },
      manufacturer: { value: 'Delight Foods Inc.', compliant: true, rule: 'Declared' },
      unitSalePrice: { value: '', compliant: false, rule: 'Unit Sale Price is missing' },
      dateOfMfg: { value: '05/26', compliant: false, rule: 'Incorrect format (must use MM/YYYY or Month/Year)' },
    },
    issues: [
      { field: 'unitSalePrice', message: 'Missing Unit Sale Price declaration (mandatory for pre-packaged commodities).' },
      { field: 'dateOfMfg', message: 'Date of manufacturing format is invalid (found: 05/26, expected: 05/2026 or May 2026).' }
    ]
  },
  {
    id: 'scan_3',
    productName: 'Crunchy Protein Bar Chocolate (50g)',
    timestamp: '2026-07-31T18:45:00.000Z',
    status: 'WARNING',
    confidence: '94.2%',
    complianceScore: 80,
    fields: {
      mrp: { value: '₹120.00', compliant: true, rule: 'Declared' },
      netQty: { value: '50g', compliant: true, rule: 'Declared' },
      manufacturer: { value: 'Power Foods Ltd.', compliant: true, rule: 'Declared' },
      unitSalePrice: { value: '₹2.40 per g', compliant: true, rule: 'Declared' },
      dateOfMfg: { value: '07/2026', compliant: true, rule: 'Declared' },
    },
    issues: [
      { field: 'netQty', message: 'Net quantity text font size (2.0mm) is border-line. Minimum requirement for packages < 50g is 2.0mm, but recommended 3.0mm.' }
    ]
  }
];

export function AppProvider({ children }) {
  const [scans, setScans] = useState(initialScans);
  const [currentScan, setCurrentScan] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeReport, setActiveReport] = useState(null);

  // Scanner State Actions
  const runMockAnalysis = async (productName, imageUrl = null) => {
    setIsScanning(true);
    setCurrentScan(null);

    // Simulate scanning/AI prediction delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const newScan = {
      id: 'scan_' + Date.now(),
      productName: productName || 'Newly Scanned Product Label',
      timestamp: new Date().toISOString(),
      status: Math.random() > 0.4 ? 'COMPLIANT' : 'NON_COMPLIANT',
      confidence: (90 + Math.random() * 9).toFixed(1) + '%',
      complianceScore: Math.random() > 0.4 ? 100 : 70,
      fields: {
        mrp: { value: '₹199.00', compliant: true, rule: 'Declared' },
        netQty: { value: '500ml', compliant: true, rule: 'Declared' },
        manufacturer: { value: 'Label Biotech Corp.', compliant: true, rule: 'Declared' },
        unitSalePrice: { value: '₹0.40 per ml', compliant: true, rule: 'Declared' },
        dateOfMfg: { value: '08/2026', compliant: true, rule: 'Declared' },
      },
      issues: []
    };

    if (newScan.status === 'NON_COMPLIANT') {
      newScan.complianceScore = 70;
      newScan.fields.unitSalePrice = { value: '', compliant: false, rule: 'Missing unit sale price' };
      newScan.issues.push({
        field: 'unitSalePrice',
        message: 'Unit Sale Price must be declared when packaging contains multiple items or a volume size.'
      });
    }

    setScans((prev) => [newScan, ...prev]);
    setCurrentScan(newScan);
    setIsScanning(false);
    return newScan;
  };

  const clearScans = () => {
    setScans([]);
    setCurrentScan(null);
  };

  const selectReport = (scanId) => {
    const scan = scans.find((s) => s.id === scanId);
    setActiveReport(scan || null);
  };

  return (
    <AppContext.Provider
      value={{
        // Scanner State
        scans,
        currentScan,
        isScanning,
        runMockAnalysis,
        clearScans,
        setCurrentScan,
        // Compliance State
        activeReport,
        selectReport,
        setActiveReport
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
