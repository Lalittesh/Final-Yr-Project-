/**
 * Hugging Face Inference Service
 * Sends image Blobs to models such as facebook/detr-resnet-50 or IDEA-Research/grounding-dino-tiny.
 */
export const hfService = {
  // Read token from environment (never hardcode secrets)
  getApiToken() {
    return import.meta.env.VITE_HF_API_TOKEN || '';
  },

  // Primary model endpoint
  getModelUrl() {
    const model = import.meta.env.VITE_HF_MODEL_NAME || 'facebook/detr-resnet-50';
    return `https://api-inference.huggingface.co/models/${model}`;
  },

  /**
   * Queries Hugging Face Inference API for object detections.
   * @param {Blob} imageBlob - Image Blob object.
   * @returns {Promise<Array>} List of detected items, scores, and bounding boxes.
   */
  async detectObjects(imageBlob) {
    const token = this.getApiToken();
    if (!token) {
      throw new Error('MISSING_TOKEN');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second API timeout

    try {
      const response = await fetch(this.getModelUrl(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': imageBlob.type || 'image/jpeg'
        },
        body: imageBlob,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle typical Hugging Face cold startup (Model loading status 503)
      if (response.status === 503) {
        throw new Error('MODEL_LOADING');
      }

      if (!response.ok) {
        throw new Error(`API_RESPONSE_ERROR_${response.status}`);
      }

      const rawResults = await response.json();
      return this.standardizeDetections(rawResults);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('TIMEOUT');
      }
      throw err;
    }
  },

  /**
   * Map different HF output formats (e.g. DETR, Grounding DINO) to a unified LMPC structure.
   */
  standardizeDetections(results) {
    if (!Array.isArray(results)) {
      console.warn('Hugging Face Inference returned non-array payload:', results);
      return [];
    }

    return results.map(item => {
      // standard det-resnet returns: { score: Float, label: String, box: { xmin, ymin, xmax, ymax } }
      const label = item.label || 'Unknown';
      const score = Math.round((item.score || 0) * 100);
      const box = item.box || { xmin: 0, ymin: 0, xmax: 0, ymax: 0 };
      
      return {
        label: this.mapCategoryLabel(label),
        confidence: score,
        box
      };
    });
  },

  /**
   * Harmonizes raw COCO labels with Legal Metrology pre-packaged commodity categories.
   */
  mapCategoryLabel(label) {
    const lower = label.toLowerCase();
    
    if (lower.includes('bottle') || lower.includes('cup') || lower.includes('beverage')) {
      return 'Beverage Bottles';
    }
    if (lower.includes('soap') || lower.includes('washing')) {
      return 'Soap';
    }
    if (lower.includes('shampoo') || lower.includes('hair') || lower.includes('conditioner')) {
      return 'Shampoo';
    }
    if (lower.includes('toothpaste') || lower.includes('dentifrice')) {
      return 'Toothpaste';
    }
    if (lower.includes('rice') || lower.includes('grain') || lower.includes('bag')) {
      return 'Rice Bags';
    }
    if (lower.includes('oil') || lower.includes('liquid') || lower.includes('cooking')) {
      return 'Cooking Oil Bottles';
    }
    if (lower.includes('milk') || lower.includes('dairy') || lower.includes('tetra')) {
      return 'Milk Packets';
    }
    if (lower.includes('medicine') || lower.includes('pill') || lower.includes('box')) {
      return 'Medicine Boxes';
    }
    if (lower.includes('biscuit') || lower.includes('cookie') || lower.includes('package')) {
      return 'Biscuit Packets';
    }
    if (lower.includes('snack') || lower.includes('chip') || lower.includes('bag') || lower.includes('pack')) {
      return 'Snacks';
    }
    
    // Capitalize default category
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
};
