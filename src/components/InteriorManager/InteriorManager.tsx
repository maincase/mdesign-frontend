import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type Render = {
  id: number
  img: string
  description: string
  objects?: (string | number | number[] | string[])[][]
}

export type Interior = { name: string; images: Render[] }

export type InteriorManagerProps = {
  items: Interior[]

  setItems: (items: Interior[]) => void

  setObjectColor: (interInd: number, renderInd: number, objectInd: number, color: string) => void
}

export const useInteriorState = create<InteriorManagerProps>()(
  immer((set) => ({
    /**
     * Interior items.
     */
    items: [],

    /**
     * Set interior items.
     *
     * @param items Array of interior items.
     * @returns
     */
    setItems: (items) => set({ items }),

    /**
     * Set color of object in interior render.
     *
     * @param interInd
     * @param renderInd
     * @param color
     * @returns
     */
    setObjectColor: (interInd: number, renderInd: number, objectInd: number, color: string) =>
      set((state) => {
        if (interInd < 0 || renderInd < 0 || objectInd < 0) return

        if (!!state.items?.[interInd]) {
          if (!!state.items?.[interInd]?.images?.[renderInd]) {
            const object = state.items?.[interInd]?.images?.[renderInd]?.objects?.[objectInd]

            if (!!object && typeof object?.[3] !== 'string') {
              object.splice(3, 0, color)
            }
          }
        }
      }),
  }))
)
