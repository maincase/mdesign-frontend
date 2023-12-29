'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew'
import { DialogContent, DialogTitle, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { interiorId, renderId } = useParams()

  const searchParams = useSearchParams()

  return (
    <>
      {searchParams.has('new') && (
        <DialogTitle component="h5" classes={{ root: 'flex justify-center' }}>
          Choose your style
        </DialogTitle>
      )}
      {!!renderId && (
        <DialogTitle component="h5" classes={{ root: 'flex' }}>
          <Link href={!!interiorId ? `/interior/${interiorId}` : '/'} className="flex flex-row items-center">
            <ArrowBackIosIcon className="!text-base" />
            <Typography variant="subtitle1" className="flex h-6 !leading-normal align-top">
              Back to options
            </Typography>
          </Link>
        </DialogTitle>
      )}
      <DialogContent classes={{ root: 'flex justify-between gap-x-3 overflow-hidden' }}>{children}</DialogContent>
    </>
  )
}
