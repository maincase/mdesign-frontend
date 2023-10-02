import isEqual from 'lodash.isequal'
import { InteriorStateProps, useInteriorState } from './InteriorState'

type InteriorItemsRet = Pick<InteriorStateProps, 'items' | 'setItems' | 'push' | 'unshift'>

function interiorItemsSelector({ items, setItems, push, unshift }: InteriorStateProps): InteriorItemsRet {
  return { items, setItems, push, unshift }
}

export function useInteriorItems() {
  return useInteriorState<InteriorItemsRet>(interiorItemsSelector, isEqual)
}
