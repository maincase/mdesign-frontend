'use client'

import ConfettiAnimation from '@/components/ConfettiAnimation/ConfettiAnimation'
import { useAppState } from '@/state/app/AppState'
import { Dialog, Slide } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef } from 'react'
import { useWindowSize } from 'usehooks-ts'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const router = useRouter()

  const isCreate = pathname.startsWith('/interior/create')

  const { width, height } = useWindowSize()

  const { runConfetti, setRunConfetti } = useAppState()

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={isCreate ? 'sm' : 'xl'}
        {...(isCreate ? { className: 'flex flex-grow justify-center items-center' } : {})}
        open
        onClose={() => router.push('/')}
        keepMounted
        // aria-describedby="alert-dialog-slide-description"
        TransitionComponent={forwardRef(function C(props, ref) {
          return <Slide direction="up" {...props} ref={ref} />
        })}
      >
        {children}
      </Dialog>

      <ConfettiAnimation
        width={width}
        height={height}
        run={runConfetti}
        // numberOfPieces={1000}
        tweenDuration={1000}
        colors={['#0CC8FF', '#7E3AFF', '#FF6B00', '#00E075']}
        duration={10}
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
    </>
  )
}
