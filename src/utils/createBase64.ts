const createBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (!!reader.result) {
        resolve(reader.result.toString())
      } else {
        reject('Error encoding image')
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsDataURL(file)
  })
export default createBase64
