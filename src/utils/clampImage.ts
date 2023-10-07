/**
 * Clamp image dimensions to specific size taking into account original image ratio.
 *
 * @param f File
 * @param size number
 * @returns Promise<File | undefined>
 */
export default async function clampImage(f: File, size = 1024) {
  const image = new Image()

  // Wait for image be loaded from file
  await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (!!reader.result) {
        image.src = reader.result.toString()
        image.onload = resolve
      } else {
        reject('Error encoding image')
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsDataURL(f)
  })

  const scaleFactor = Math.min(size / image.width, size / image.height)
  const scaledWidth = image.width * scaleFactor
  const scaledHeight = image.height * scaleFactor

  const canvas = document.createElement('canvas')
  canvas.width = scaledWidth
  canvas.height = scaledHeight

  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  context.drawImage(image, 0, 0, scaledWidth, scaledHeight)

  const res = await new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!!blob) {
        resolve(new File([blob], f.name, { type: f.type }))
      } else {
        reject('Error decoding image')
      }
    })
  })

  return res
}
