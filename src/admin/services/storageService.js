import imageCompression from 'browser-image-compression'
import { supabase, getCompressionSettings } from '../../lib/supabaseClient'

export class StorageService {
  
  /**
   * Upload image with smart compression based on image type
   * @param {File} file - The image file to upload
   * @param {string} imageType - Type of image (hero, carousel, thumbnail, profile, project)
   * @param {string} bucket - Storage bucket name
   * @param {string} folder - Folder path within bucket
   * @returns {Promise<Object>} Upload result with URL and metadata
   */
  static async uploadImage(file, imageType = 'project', bucket = 'portfolio-images', folder = '') {
    try {
      const compressionSettings = getCompressionSettings(imageType)
      let processedFile = file
      let compressionData = null

      // Apply compression unless it's a high-quality image type
      if (!compressionSettings.skipCompression) {
        const options = {
          maxSizeMB: compressionSettings.maxSizeMB,
          maxWidthOrHeight: compressionSettings.maxWidthOrHeight,
          useWebWorker: true,
          fileType: 'image/webp'
        }

        processedFile = await imageCompression(file, options)
        
        compressionData = {
          originalSize: file.size,
          compressedSize: processedFile.size,
          compressionRatio: ((file.size - processedFile.size) / file.size * 100).toFixed(2),
          savings: (file.size - processedFile.size)
        }
      }

      // Generate unique filename with type prefix
      const fileExt = processedFile.type.split('/')[1] || 'webp'
      const fileName = `${imageType}-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = folder ? `${folder}/${fileName}` : fileName

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, processedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        success: true,
        path: data.path,
        url: publicUrl,
        fileName: fileName,
        imageType,
        bucket,
        originalSize: file.size,
        finalSize: processedFile.size,
        compressionData,
        metadata: {
          originalName: file.name,
          mimeType: processedFile.type,
          uploadedAt: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Upload failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Delete image from storage
   * @param {string} path - File path in storage
   * @param {string} bucket - Storage bucket name
   * @returns {Promise<Object>} Deletion result
   */
  static async deleteImage(path, bucket = 'portfolio-images') {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error
      
      return { success: true }
    } catch (error) {
      console.error('Delete failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Get public URL for an image
   * @param {string} path - File path in storage
   * @param {string} bucket - Storage bucket name
   * @returns {string} Public URL
   */
  static getImageUrl(path, bucket = 'portfolio-images') {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return publicUrl
  }

  /**
   * List all files in a folder
   * @param {string} folder - Folder path
   * @param {string} bucket - Storage bucket name
   * @returns {Promise<Object>} List of files
   */
  static async listImages(folder = '', bucket = 'portfolio-images') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error

      return {
        success: true,
        files: data.map(file => ({
          ...file,
          url: this.getImageUrl(folder ? `${folder}/${file.name}` : file.name, bucket)
        }))
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Get image type from filename
   * @param {string} fileName - File name
   * @returns {string} Image type
   */
  static getImageTypeFromFileName(fileName) {
    if (fileName.startsWith('hero-')) return 'hero'
    if (fileName.startsWith('carousel-')) return 'carousel'
    if (fileName.startsWith('thumbnail-')) return 'thumbnail'
    if (fileName.startsWith('profile-')) return 'profile'
    return 'project'
  }
}