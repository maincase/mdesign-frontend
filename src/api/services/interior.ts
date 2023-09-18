import { InteriorType } from '@/state/interior/InteriorState'
import client from '../client'

class InteriorService {
  /**
   *
   * @param skip
   * @param limit
   * @returns
   */
  static async getInteriors(skip = 0, limit = 20) {
    if (Number.isNaN(limit) || limit > 20) {
      limit = 20
    }

    if (Number.isNaN(skip) || skip < 0) {
      skip = 0
    }

    const json = await client.get('interior/get', { searchParams: { skip, limit } }).json<{
      code: string
      message: string
      data: InteriorType[]
    }>()

    return json.data
  }

  /**
   *
   * @param id
   * @returns
   */
  static async getInterior(id: string) {
    if (!id) {
      throw new Error('Interior ID is required')
    }

    const json = await client.get(`interior/get/${id}`).json<{
      code: string
      message: string
      data: InteriorType
    }>()

    return json.data
  }

  /**
   *
   * @param interior
   * @returns
   */
  static async createInterior(interior: InteriorType) {
    if (!interior) {
      throw new Error('Interior is required')
    }

    if (!interior.image) {
      throw new Error('Interior image is required')
    }

    if (!interior.room) {
      throw new Error('Interior room is required')
    }

    if (!interior.style) {
      throw new Error('Interior style is required')
    }

    const formData = new FormData()
    formData.append('file', interior.image)
    formData.append('room', interior.room)
    formData.append('style', interior.style)

    const json = await client.post('interior/create', { body: formData }).json<{
      code: string
      message: string
      data: InteriorType
    }>()

    return json.data
  }
}

export default InteriorService
