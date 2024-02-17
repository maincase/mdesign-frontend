import { useAppState } from '@/state/app/AppState'
import ConfettiAnimation from '../ConfettiAnimation/ConfettiAnimation'

/**
 * Runs confetti animation when runConfetti is true
 *
 * @returns JSX.Element
 */
export default function Confetti() {
  const { runConfetti, setRunConfetti } = useAppState()

  return (
    <ConfettiAnimation
      run={runConfetti}
      // numberOfPieces={1000}
      tweenDuration={1000}
      colors={['#0CC8FF', '#7E3AFF', '#FF6B00', '#00E075']}
      duration={4}
      onFinish={() => setRunConfetti(false)}
      drawShape={(ctx) => {
        ctx.beginPath()
        for (let i = 0; i < 30; i++) {
          const rectHeight = 14
          const rectWidth = 2
          const x = rectHeight + Math.random() * 3
          const y = rectWidth + Math.random() * 2
          ctx.fillRect(-10, -10, x, y)
        }
        ctx.stroke()
        ctx.closePath()
      }}
    />
  )
}
