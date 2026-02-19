import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Image type constants for compression
export const IMAGE_TYPES = {
  HERO: 'hero',
  CAROUSEL: 'carousel', 
  THUMBNAIL: 'thumbnail',
  PROFILE: 'profile',
  PROJECT: 'project',
  ICON: 'icon'
}

// Compression settings by image type
export const getCompressionSettings = (imageType) => {
  const settings = {
    [IMAGE_TYPES.HERO]: {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      quality: 0.95,
      skipCompression: true // High quality for hero images
    },
    [IMAGE_TYPES.CAROUSEL]: {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      quality: 0.95,
      skipCompression: true // High quality for carousel
    },
    [IMAGE_TYPES.THUMBNAIL]: {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 400,
      quality: 0.7,
      skipCompression: false
    },
    [IMAGE_TYPES.PROFILE]: {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      quality: 0.8,
      skipCompression: false
    },
    [IMAGE_TYPES.PROJECT]: {
      maxSizeMB: 2,
      maxWidthOrHeight: 1200,
      quality: 0.85,
      skipCompression: false
    },
    [IMAGE_TYPES.ICON]: {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 128,
      quality: 0.9,
      skipCompression: false
    }
  }
  
  return settings[imageType] || settings[IMAGE_TYPES.PROJECT]
}