import { animated, useSpring } from '@react-spring/web'
import { cloneElement, forwardRef } from 'react'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

export default forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
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
