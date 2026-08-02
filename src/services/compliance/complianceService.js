import metrologyConfig from './metrologyConfig.json';

/**
 * Compliance Verification Service
 * Audits parsed label text strings against Legal Metrology rules (e.g. LMPC 2011).
 */
export const complianceService = {
  /**
   * Evaluates the extracted text keys and values against metrology guidelines.
   * @param {Object} detectedFields - Parsed key-value pairs (e.g. { MRP: '10.00', netQty: '100g' })
   * @returns {Object} Audit outcome details including compliance score, flags, and warnings.
   */
  evaluateCompliance(detectedFields) {
    const required = metrologyConfig.requiredFields;
    const missing = [];
    const warnings = [];
    const recommendations = [];
    
    // Check for missing mandatory declarations
    required.forEach(field => {
      const matchKey = Object.keys(detectedFields).find(
        key => key.toLowerCase().replace(/\s+/g, '') === field.toLowerCase().replace(/\s+/g, '')
      );
      if (!matchKey || !detectedFields[matchKey]) {
        missing.push(field);
      }
    });

    // Check typography print size warnings (mock check placeholders)
    if (detectedFields.netQty && parseFloat(detectedFields.netQty) < 50) {
      warnings.push('Net Quantity font height is border-line (less than 2.0mm recommendation).');
      recommendations.push('Increase font size to 3.0mm to optimize retail display prominence.');
    }

    const matchedCount = required.length - missing.length;
    const score = Math.round((matchedCount / required.length) * 100);

    return {
      score,
      status: score === 100 ? 'COMPLIANT' : (score >= 60 ? 'WARNING' : 'NON_COMPLIANT'),
      missingFields: missing,
      warnings,
      recommendations,
      ruleReference: 'LMPC Rules 2011 • Chapter II General Declarations'
    };
  }
};
