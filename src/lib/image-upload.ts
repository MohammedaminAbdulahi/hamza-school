// Client-side image upload helper.
//
// Resizes an uploaded image file to a max width (default 800px) and converts
// it to a JPEG data URL at the requested quality (default 0.8). The resulting
// base64 string can be stored in a TEXT column and rendered directly in an
// <img src="data:image/jpeg;base64,..."> tag.
//
// This keeps the payload small enough for a single JSON POST to the admin API
// while preserving enough detail for a crisp on-screen photo.

export async function fileToResizedBase64(
  file: File,
  maxWidth = 800,
  quality = 0.8
): Promise<string> {
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
    el.onerror = () => reject(new Error('Could not decode image'))
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
    // If 2D context isn't available, fall back to the original data URL.
    return dataUrl
  }
  // White background so transparent PNGs don't go black when JPEG-ified.
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetW, targetH)
  ctx.drawImage(img, 0, 0, targetW, targetH)

  // Export as JPEG. Some browsers (Safari < 16) don't support a quality arg
  // for toDataURL('image/jpeg') — fall back to default if it throws.
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
