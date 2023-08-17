'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew'
import { DialogContent, DialogTitle, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { forwardRef } from 'react'

export default forwardRef(function Layout({ children }: { children: React.ReactNode }, ref) {
  const { interiorId, renderId } = useParams()

  const searchParams = useSearchParams()

  return (
    <>
      {searchParams.has('new') && (
        <DialogTitle classes={{ root: 'flex justify-center' }}>
          <Typography variant="h5">Choose your style</Typography>
        </DialogTitle>
      )}
      {!!renderId && (
        <DialogTitle classes={{ root: 'flex' }}>
          <Link href={!!interiorId ? `/interior/${interiorId}` : '/'} className="flex flex-row items-center">
            <ArrowBackIosIcon className="!text-base" />
            <Typography variant="subtitle1" className="flex mt-4 h-6 !leading-normal align-top">
              Back to options
            </Typography>
          </Link>
        </DialogTitle>
      )}
      <DialogContent classes={{ root: 'flex' }} ref={ref}>
        {children}
      </DialogContent>
    </>
  )
})
