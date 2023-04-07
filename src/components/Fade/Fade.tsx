import { animated, useSpring } from '@react-spring/web'
import { ComponentPropsWithoutRef, ForwardedRef, cloneElement, forwardRef } from 'react'

type FadeProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactElement
  in?: boolean
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

export default forwardRef<HTMLDivElement, FadeProps>(function Fade(
  { children, in: open, onClick, onEnter, onExited, ownerState, ...other }: FadeProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0, display: open ? 'flex' : 'none' },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true)
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  )
})
