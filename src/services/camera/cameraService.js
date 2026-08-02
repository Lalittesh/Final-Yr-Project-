/**
 * MediaDevices Browser Camera Stream Service
 * Handles getUserMedia operations, stream toggling, aspect calculations, and video frame captures.
 */
export const cameraService = {
  /**
   * Request live video media stream with specific constraint mappings.
   * @param {string} facingMode - 'user' or 'environment' camera lens mode.
   * @returns {Promise<MediaStream>} The acquired MediaStream object.
   */
  async getStream(facingMode = 'environment') {
    const constraints = {
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: { ideal: 1.777777778 } // 16:9 aspect ratio target
      },
      audio: false
    };

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('BROWSER_UNSUPPORTED');
      }
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      this.handleStreamError(err);
      throw err;
    }
  },

  /**
   * Shuts down all media tracks running on a given video stream.
   * @param {MediaStream} stream - Active MediaStream buffer.
   */
  stopStream(stream) {
    if (stream && stream.getTracks) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log(`Video stream track stopped: ${track.label}`);
      });
    }
  },

  /**
   * Captures the current frame buffer from a running video element.
   * @param {HTMLVideoElement} videoElement - Live streaming video element.
   * @returns {string} Base64 representation of the frame canvas (image/png).
   */
  captureFrame(videoElement) {
    if (!videoElement || videoElement.paused || videoElement.ended) {
      throw new Error('CAMERA_FEED_INACTIVE');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set matching dimensions
    canvas.width = videoElement.videoWidth || 640;
    canvas.height = videoElement.videoHeight || 360;
    
    // Draw frame
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Convert to Base64 URI data
    return canvas.toDataURL('image/png');
  },

  /**
   * Maps media errors to reader friendly diagnostics.
   * @param {Error} err - Captured promise error.
   */
  handleStreamError(err) {
    console.error('Camera stream initialization encountered an error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      err.customMessage = 'Camera permission was denied. Please allow access inside settings.';
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      err.customMessage = 'No camera system was detected on this portal terminal.';
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      err.customMessage = 'Camera is currently busy. Verify if another application is running it.';
    } else if (err.name === 'OverconstrainedError') {
      err.customMessage = 'Requested camera resolution constraints could not be satisfied.';
    } else {
      err.customMessage = err.message || 'Camera stream could not be initialized.';
    }
  }
};
