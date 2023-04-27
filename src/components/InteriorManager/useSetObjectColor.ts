import { InteriorManagerProps, useInteriorState } from './InteriorManager'

function setObjectColorSelector(state: InteriorManagerProps): InteriorManagerProps['setObjectColor'] {
  return state.setObjectColor
}

export function useSetObjectColor() {
  return useInteriorState<InteriorManagerProps['setObjectColor']>(setObjectColorSelector)
}
