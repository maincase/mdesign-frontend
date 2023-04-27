import * as R from 'remeda'
import { InteriorManagerProps, useInteriorState } from './InteriorManager'

type InteriorItemsRet = [InteriorManagerProps['items'], (inter: InteriorManagerProps['items']) => void]

function interiorItemsSelector(state: InteriorManagerProps): InteriorItemsRet {
  return [state.items, state.setItems]
}

export function useInteriorItems() {
  return useInteriorState<InteriorItemsRet>(interiorItemsSelector, R.equals)
}
