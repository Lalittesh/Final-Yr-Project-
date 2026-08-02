import { aiConfig } from '../ai/aiConfig';

/**
 * OCR Processing Service
 * Interfaces with EasyOCR or PaddleOCR engines to extract string labels from cropped image arrays.
 */
export const ocrService = {
  /**
   * Processes cropped label segments to read textual values.
   * @param {string} croppedImageBase64 - Base64 cropped image.
   * @returns {Promise<Object>} Identified Metrology fields object.
   */
  async extractText(croppedImageBase64) {
    console.log(`Sending label fragment to ${aiConfig.models.ocr.preferred} parser...`);
    
    // Simulate OCR delay (to be replaced with actual OCR endpoint call later)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock parsed metrology findings
    return {
      productName: 'Parle-G Gold Biscuits',
      brand: 'Parle',
      category: 'Food Products',
      mrp: '₹10.00 (Incl. of all taxes)',
      netQty: '100g',
      manufacturer: 'Parle Products Pvt. Ltd.',
      importer: 'N/A (Domestic)',
      batchNumber: 'PGG-0626A',
      dateOfMfg: '06/2026',
      expiryDate: '12/2026',
      countryOfOrigin: 'India'
    };
  }
};
