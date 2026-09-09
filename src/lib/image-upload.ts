// Client-side image upload helper.
//
// Validates, resizes, and converts an uploaded image file to a JPEG data URL.

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB before resize

export async function fileToResizedBase64(
  file: File,
  maxWidth = 800,
  quality = 0.8
): Promise<string> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF.')
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Maximum 10MB.')
  }

  // Read the file into a data URL the browser can decode.
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })

  // Load the image so we can read its natural dimensions.
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image()
    el.onload = () => resolve(el)
    el.onerror = () => reject(new Error('Could not decode image. The file may be corrupted.'))
    el.src = dataUrl
  })

  // Compute the target dimensions, preserving aspect ratio.
  const naturalW = img.naturalWidth || img.width
  const naturalH = img.naturalHeight || img.height
  let targetW = naturalW
  let targetH = naturalH
  if (targetW > maxWidth) {
    const ratio = maxWidth / targetW
    targetW = maxWidth
    targetH = Math.round(naturalH * ratio)
  }

  // Draw onto a canvas at the target size.
  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return dataUrl
  }
  // White background so transparent PNGs don't go black when JPEG-ified.
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetW, targetH)
  ctx.drawImage(img, 0, 0, targetW, targetH)

  // Export as JPEG.
  try {
    return canvas.toDataURL('image/jpeg', quality)
  } catch {
    return canvas.toDataURL('image/jpeg')
  }
}

// True when a string looks like a base64 data URL (a real photo) vs a
// SmartImage placeholder seed like "campus" or "science-fair".
export function isDataUrl(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('data:')
}
