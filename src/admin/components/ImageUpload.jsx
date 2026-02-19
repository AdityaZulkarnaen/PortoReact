import { useState } from 'react'
import { StorageService } from '../services/storageService'
import { IMAGE_TYPES } from '../../lib/supabaseClient'

const ImageUpload = ({ 
  imageType = IMAGE_TYPES.PROJECT,
  onUploadSuccess,
  onUploadError,
  folder = '',
  className = '',
  accept = 'image/*'
}) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = (file) => {
    if (file) {
      // Show preview
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)

      // Start upload
      handleUpload(file)
    }
  }

  const handleUpload = async (file) => {
    setUploading(true)
    setProgress(0)
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 100)

      const result = await StorageService.uploadImage(file, imageType, 'portfolio-images', folder)
      
      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        onUploadSuccess && onUploadSuccess(result)
        // Clear preview after successful upload
        setTimeout(() => {
          setPreview(null)
          setProgress(0)
        }, 1000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      onUploadError && onUploadError(error)
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const isHighQuality = imageType === IMAGE_TYPES.HERO || imageType === IMAGE_TYPES.CAROUSEL

  return (
    <div className={`image-upload-container ${className}`}>
      
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && document.getElementById(`file-input-${imageType}`).click()}
      >
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Preview" className="max-h-32 mx-auto rounded" />
            <div className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload different image'}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}

        <input
          id={`file-input-${imageType}`}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Image Type Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-medium">Upload Type: </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isHighQuality 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {imageType.toUpperCase()}
            </span>
          </div>
          <div className="text-right">
            <div className={`text-xs ${isHighQuality ? 'text-green-600' : 'text-blue-600'}`}>
              {isHighQuality ? '🎯 High Quality' : '⚡ Optimized'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload