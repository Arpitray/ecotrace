import { supabase } from './SupabaseClient';

/**
 * Upload an image file to Supabase Storage
 * @param {File|Blob} file - The image file to upload
 * @param {string} userId - The user ID for organizing uploads
 * @returns {Promise<{url: string, path: string} | null>} - The public URL and storage path
 */
export const uploadPlantImage = async (file, userId) => {
  try {
    if (!file || !userId) {
      console.error('Missing file or userId for upload');
      return null;
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name?.split('.').pop() || 'jpg';
    const fileName = `${userId}/${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('plant-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('plant-images')
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      path: fileName
    };
  } catch (err) {
    console.error('Error in uploadPlantImage:', err);
    return null;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} imagePath - The storage path of the image
 * @returns {Promise<boolean>} - Success status
 */
export const deletePlantImage = async (imagePath) => {
  try {
    if (!imagePath) return false;

    const { error } = await supabase.storage
      .from('plant-images')
      .remove([imagePath]);

    if (error) {
      console.error('Error deleting image:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error in deletePlantImage:', err);
    return false;
  }
};

/**
 * Convert data URL to File object
 * @param {string} dataUrl - The base64 data URL
 * @param {string} filename - Desired filename
 * @returns {File} - File object
 */
export const dataURLtoFile = (dataUrl, filename = 'plant-image.jpg') => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};
