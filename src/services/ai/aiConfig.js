/**
 * AI Service Configuration Preset
 * Reads Hugging Face credentials and maps computer vision models.
 */
export const aiConfig = {
  // Read token from Vite environment variables (do not hardcode)
  apiToken: import.meta.env.VITE_HF_API_TOKEN || '',
  
  // Model checkpoints (Hugging Face / Self-hosted routes)
  models: {
    objectDetection: {
      preferred: 'IDEA-Research/grounding-dino-tiny', // Preferred Grounding DINO model
      fallback: 'facebook/detr-resnet-50',           // DETR backup
      localYoloUrl: import.meta.env.VITE_YOLO_LOCAL_URL || 'http://localhost:8000/detect'
    },
    ocr: {
      preferred: 'PaddleOCR', // Preferred OCR system
      alternative: 'EasyOCR'  // EasyOCR backup
    },
    barcode: {
      preferred: 'ZXing',     // ZXing multi-format reader
      alternative: 'pyzbar'   // Python pyzbar wrapper
    }
  },
  
  endpoints: {
    hfInference: 'https://api-inference.huggingface.co/models/'
  }
};
