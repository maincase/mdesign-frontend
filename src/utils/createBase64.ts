const createBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const encoded = reader.result?.toString()?.split(',')[1]

      if (encoded) {
        resolve(`data:${file.type};base64,${encoded}`)
      } else {
        reject('Error encoding image')
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsDataURL(file)
  })
export default createBase64
