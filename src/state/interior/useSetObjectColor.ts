import { InteriorStateProps, useInteriorState } from './InteriorState'

function setObjectColorSelector(state: InteriorStateProps): InteriorStateProps['setObjectColor'] {
  return state.setObjectColor
}

export function useSetObjectColor() {
  return useInteriorState<InteriorStateProps['setObjectColor']>(setObjectColorSelector)
}
