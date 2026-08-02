import { aiConfig } from './aiConfig';

/**
 * AI Product Detection Service
 * Coordinates object detection and segmentation queries to Hugging Face or YOLO local servers.
 */
export const aiService = {
  /**
   * Queries Hugging Face Inference API for object detections.
   * @param {string} imageBase64 - Base64 encoded image data.
   * @param {Array<string>} candidateLabels - Labels to search for (e.g. ['product', 'label', 'barcode'])
   * @returns {Promise<Array>} List of bounding boxes, scores, and class labels.
   */
  async detectObjects(imageBase64, candidateLabels = ['label', 'mrp', 'ingredients']) {
    if (!aiConfig.apiToken) {
      console.warn('Hugging Face API token is missing. Please declare VITE_HF_API_TOKEN in env variables.');
      return this.getMockDetections();
    }

    try {
      const model = aiConfig.models.objectDetection.preferred;
      const response = await fetch(`${aiConfig.endpoints.hfInference}${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${aiConfig.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: imageBase64,
          parameters: { candidate_labels: candidateLabels }
        })
      });

      if (!response.ok) {
        throw new Error(`HF Inference API failed with status ${response.status}`);
      }

      return await response.json();
    } catch (e) {
      console.error('AI Object Detection query encountered an error. Falling back to mockup logs.', e);
      return this.getMockDetections();
    }
  },

  /**
   * Extracts bounding box coordinate crops from source canvases.
   * @param {HTMLCanvasElement} sourceCanvas - Original canvas buffer.
   * @param {Object} boundingBox - Coordinate object { xmin, ymin, xmax, ymax }
   * @returns {string} Base64 representation of the cropped region.
   */
  cropDetectedArea(sourceCanvas, boundingBox) {
    const { xmin, ymin, xmax, ymax } = boundingBox;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = xmax - xmin;
    const height = ymax - ymin;
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(sourceCanvas, xmin, ymin, width, height, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  },

  getMockDetections() {
    return [
      { box: { xmin: 10, ymin: 20, xmax: 180, ymax: 200 }, score: 0.98, label: 'Product Outline' },
      { box: { xmin: 30, ymin: 40, xmax: 170, ymax: 190 }, score: 0.99, label: 'Label Wrapper' },
      { box: { xmin: 50, ymin: 140, xmax: 150, ymax: 180 }, score: 0.95, label: 'Barcode' }
    ];
  }
};
