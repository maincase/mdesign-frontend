'use client'

import { Dialog, Slide } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const router = useRouter()

  const isCreate = pathname.startsWith('/interior/create')

  return (
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
  )
}
