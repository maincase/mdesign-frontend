'use client'

import { DialogContent } from '@mui/material'
import { forwardRef } from 'react'

export default forwardRef(function Layout({ children }: { children: React.ReactNode }, ref) {
  return (
    <DialogContent classes={{ root: 'flex' }} ref={ref}>
      {children}
    </DialogContent>
  )
})
