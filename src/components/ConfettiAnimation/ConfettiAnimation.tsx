import { css } from '@emotion/css'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Confetti, { Props as BaseConfettiType } from 'react-confetti'

export type ConfettiAnimationProps = BaseConfettiType & {
  duration?: number
  onFinish?: () => void
}

const styles = {
  confetti: css`
    z-index: 10000 !important;
  `,
}

export default function ConfettiAnimation({
  duration,
  onFinish,
  run: recycleController,
  className,
  ...props
}: ConfettiAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [run, setRun] = useState(false)
  const [recycle, setRecycle] = useState(!!recycleController)
  const [animationTime, setAnimationTime] = useState(0)
  const [stopConfettiActualTime, setStopConfettiActualTime] = useState(0)

  const animationTimeRef = useRef<NodeJS.Timeout | null>(null)

  const clearTiming = () => {
    setRun(false)

    onFinish?.()

    if (!!animationTimeRef.current) {
      clearInterval(animationTimeRef.current)
    }
  }

  // On unmount
  useEffect(
    () => () => {
      setRun(false)
      clearTiming()
    },
    []
  )

  useEffect(() => {
    if (typeof recycleController !== 'undefined') {
      setRecycle(!!recycleController)

      if (!!recycleController) {
        setStopConfettiActualTime(0)
        setAnimationTime(0)
        setRun(true)
        // start animation time measurement
        if (animationTimeRef.current) {
          clearInterval(animationTimeRef.current)
        }
        animationTimeRef.current = setInterval(() => setAnimationTime((seconds) => seconds + 1), 1000)
      }
    }
  }, [recycleController])

  useEffect(() => {
    if (!recycle) {
      setStopConfettiActualTime(animationTime)
    }
  }, [recycle])

  useEffect(() => {
    if (!recycle) {
      // remove animation
      if (animationTime === stopConfettiActualTime + 6) {
        clearTiming()
      }
    } else if (duration && animationTime === duration) {
      // stop spawning confetti
      setRecycle(false)
    }
  }, [animationTime])

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && <Confetti run={run} recycle={recycle} {...props} className={clsx(styles.confetti, className)} />
}
