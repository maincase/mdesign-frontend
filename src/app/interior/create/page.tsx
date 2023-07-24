'use client'

import { Box, Fade } from '@mui/material'
import { useState } from 'react'
import InteriorForm from '../../../components/InteriorForm/InteriorForm'
import InteriorProgress from '../../../components/InteriorProgress/InteriorProgress'

export default function Page() {
  const [newInteriorId, setNewInteriorId] = useState<string | undefined>(
    typeof window !== 'undefined' ? localStorage?.getItem('renderInteriorId') ?? undefined : undefined
  )

  return (
    <Box width={600} height={700} display="flex" flexGrow={1} flexDirection="column">
      {/* <Dialog
      PaperProps={{
        sx: { minHeight: '60vh' },
      }}
      /* sx={{ minHeight: '300' }} *\/ fullWidth
      maxWidth="sm"
      open
      onClose={() => router.push('/')}
      TransitionComponent={Zoom}
    > */}

      {/* <ReactSpring.FadeIn className="flex flex-grow items-center justify-center" active={!!newInteriorId}> */}
      <Fade in={!!newInteriorId} unmountOnExit>
        <InteriorProgress newInteriorId={newInteriorId} setNewInteriorId={setNewInteriorId} />
      </Fade>
      {/* </ReactSpring.FadeIn> */}

      {/* <ReactSpring.FadeIn active={!newInteriorId}> */}
      <Fade in={!newInteriorId} unmountOnExit>
        <InteriorForm setNewInteriorId={setNewInteriorId} />
      </Fade>
      {/* </ReactSpring.FadeIn> */}

      {/* </Dialog> */}
    </Box>
  )
}
