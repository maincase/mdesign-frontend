import { animated, config, useSpring, useTransition } from '@react-spring/web'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export type ReactSpringProps = ComponentPropsWithoutRef<'div'> & {
  active: boolean
  delay?: number
  disabled?: boolean
}

function FadeIn({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { opacity: 0, transform: 'translate3d(0)' },
    enter: { opacity: 1, transform: 'translate3d(0)' },
    leave: { opacity: 0, transform: 'translate3d(0)' },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div {...props} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function FadeInMount({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition((styles) => (
    <animated.div {...props} style={styles}>
      {children}
    </animated.div>
  ))
}

function FadeUp({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { translateY: '100px', opacity: 0 },
    enter: { translateY: '0px', opacity: 1 },
    leave: { translateY: '100px', opacity: 0 },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div {...props} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function FadeInRight({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { translateX: '-100px', opacity: 0 },
    enter: { translateX: '0px', opacity: 1 },
    leave: { translateX: '-100px', opacity: 0 },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div {...props} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function FadeOutRight({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { translateX: '100px', opacity: 1 },
    enter: { translateX: '0px', opacity: 0 },
    leave: { translateX: '100px', opacity: 1 },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div {...props} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function FadeScaleOut({ active, children, delay, disabled, className }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { scale: 3, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 3, opacity: 0 },
    config: config.slow,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div className={className} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function Collapse({ active, children, delay, disabled, className, ...props }: ReactSpringProps) {
  const transitions = useTransition(active, {
    from: { maxHeight: '0px', opacity: 0 },
    enter: { maxHeight: '1000px', opacity: 1 },
    leave: { maxHeight: '0px', opacity: 0 },
    reverse: active,
    delay,
    config: config.default,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transitions(
    (styles, active) =>
      active && (
        <animated.div {...props} className={clsx('overflow-hidden', className)} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function Scale({ active, children, /* delay, */ disabled, ...props }: ReactSpringProps) {
  const { transform } = useSpring({
    transform: `scale(${active ? 1.1 : 1})`,
    config: { mass: 5, tension: 500, friction: 80 },
    // reverse: active,
    // delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return (
    <animated.div {...props} style={{ transform }}>
      {children}
    </animated.div>
  )
}

function ScaleIn({ active, children, delay, disabled, className }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { scale: 0.5 },
    enter: { scale: 1 },
    leave: { scale: 0.5 },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div className={className} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function ScaleInRight({ active, children, delay, disabled, className }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { opacity: 0, scale: 0.5, right: 180, bottom: document.body.clientHeight - 100 },
    enter: { opacity: 1, scale: 1, right: 30, bottom: 100 },
    leave: { opacity: 0, scale: 0.5, right: 180, bottom: document.body.clientHeight - 200 },
    config: {
      tension: 300,
      friction: 80,
      mass: 1,
    },
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div className={className} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function SlideDown({ active, children, delay, disabled, ...props }: ReactSpringProps) {
  const transition = useTransition(active, {
    from: { opacity: 0, height: 0, transform: 'translate3d(0)' },
    enter: { opacity: 1, transform: 'translate3d(0)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(0)' },
    config: config.default,
    reverse: active,
    delay,
  })

  if (disabled) {
    return <>{children}</>
  }

  return transition(
    (styles, active) =>
      active && (
        <animated.div {...props} style={styles}>
          {children}
        </animated.div>
      )
  )
}

function ReactSpring() {
  return null
}

ReactSpring.FadeIn = FadeIn
ReactSpring.FadeUp = FadeUp
ReactSpring.Scale = Scale
ReactSpring.ScaleIn = ScaleIn
ReactSpring.Collapse = Collapse
ReactSpring.FadeInRight = FadeInRight
ReactSpring.FadeOutRight = FadeOutRight
ReactSpring.FadeScaleOut = FadeScaleOut
ReactSpring.ScaleInRight = ScaleInRight
ReactSpring.SlideDown = SlideDown
ReactSpring.FadeInMount = FadeInMount

export default ReactSpring
