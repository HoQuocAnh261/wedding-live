import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  onProgress?: (percent: number) => void;
  timeoutMs?: number;
}

/**
 * Compresses an image client-side to target size (< 800KB) before uploading.
 * Handles slow devices, mobile rear camera orientation, and network timeout.
 */
export async function compressWeddingPhoto(
  imageFile: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxSizeMB = 0.78, // Target under 800KB (0.78MB)
    maxWidthOrHeight = 1920, // 1080p/4K balance for large 16:9 stage displays
    useWebWorker = true,
    onProgress,
    timeoutMs = 15000,
  } = options;

  // If already under 700KB and small enough, skip heavy compression
  if (imageFile.size < 700 * 1024) {
    if (onProgress) onProgress(100);
    return imageFile;
  }

  const compressionPromise = imageCompression(imageFile, {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker,
    onProgress,
    fileType: 'image/jpeg',
    initialQuality: 0.82,
  });

  // Timeout guard in case mobile browser web worker hangs on large HEIC/RAW
  const timeoutPromise = new Promise<File>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Thời gian nén ảnh quá lâu, hệ thống sẽ sử dụng ảnh nguyên bản'));
    }, timeoutMs);
  });

  try {
    const compressedBlob = await Promise.race([compressionPromise, timeoutPromise]);
    // Convert back to File preserving original name
    const newFile = new File([compressedBlob], imageFile.name.replace(/\.[^/.]+$/, '') + '.jpg', {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
    return newFile;
  } catch (err) {
    console.warn('Image compression warning (falling back to original):', err);
    return imageFile;
  }
}
