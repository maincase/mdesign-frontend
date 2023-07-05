'use client'

import Dialog from '@/components/Dialog/Dialog'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <Dialog
      fullWidth
      // fullScreen
      // maxWidth={false}
      // maxWidth={!!currentRender ? 'lg' : 'xl'}
      maxWidth="xl"
      className="flex flex-grow justify-center items-center"
      open
      onClose={() => router.push('/')}
      contentClasses={{ root: 'flex' }}
      keepMounted={false}
    >
      {children}
    </Dialog>
  )
}
