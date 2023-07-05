import * as R from 'remeda'
import { InteriorManagerProps, useInteriorState } from './InteriorManager'

type InteriorItemsRet = Pick<InteriorManagerProps, 'items' | 'setItems' | 'push' | 'unshift'>

function interiorItemsSelector({ items, setItems, push, unshift }: InteriorManagerProps): InteriorItemsRet {
  return { items, setItems, push, unshift }
}

export function useInteriorItems() {
  return useInteriorState<InteriorItemsRet>(interiorItemsSelector, R.equals)
}
