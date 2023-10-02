import isEqual from 'lodash.isequal'
import { immer } from 'zustand/middleware/immer'
import { createWithEqualityFn } from 'zustand/traditional'

export type Render = {
  id: string
  image?: string
  objects?: (string | number | number[] | string[])[][]
}

export type InteriorType = {
  id: string
  image: string
  progress?: number
  room: string
  style: string
  renders?: Render[]
}

export type InteriorStateProps = {
  items: InteriorType[]

  setItems: (items: InteriorType[]) => void

  push: (item: InteriorType) => void

  unshift: (item: InteriorType) => void

  setObjectColor: (interInd: number, renderInd: number, objectInd: number, color: string) => void
}

export const useInteriorState = createWithEqualityFn<InteriorStateProps>()(
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
     *
     * @param item
     * @returns
     */
    push: (item: InteriorType) =>
      set((state) => {
        state.items.push(item)

        return state
      }),

    /**
     *
     * @param item
     * @returns
     */
    unshift: (item: InteriorType) =>
      set((state) => {
        state.items.unshift(item)

        return state
      }),

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
          if (!!state.items?.[interInd]?.renders?.[renderInd]) {
            const object = state.items?.[interInd]?.renders?.[renderInd]?.objects?.[objectInd]

            if (!!object && typeof object?.[3] !== 'string') {
              object.splice(3, 0, color)
            }
          }
        }
      }),
  })),
  isEqual
)
