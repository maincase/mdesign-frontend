'use client'

import InteriorForm from '@/components/InteriorForm/InteriorForm'
import InteriorProgress from '@/components/InteriorProgress/InteriorProgress'
import { Box, Fade } from '@mui/material'
import { useState } from 'react'

export default function Page() {
  const [newInteriorId, setNewInteriorId] = useState<string | undefined>(
    typeof window !== 'undefined' ? sessionStorage?.getItem('renderInteriorId') ?? undefined : undefined
  )

  return (
    <Box
      sx={{
        minHeight: 700,
        minWidth: 600,
        overflow: 'hidden',
        display: 'flex',
        // flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <ReactSpring.FadeIn active={!newInteriorId}> */}
      <Fade in={!newInteriorId} unmountOnExit /* className="absolute" */>
        <InteriorForm setNewInteriorId={setNewInteriorId} />
      </Fade>
      {/* </ReactSpring.FadeIn> */}

      {/* <ReactSpring.FadeIn className="flex flex-grow items-center justify-center" active={!!newInteriorId}> */}
      <Fade in={!!newInteriorId} unmountOnExit className="absolute">
        <InteriorProgress newInteriorId={newInteriorId} setNewInteriorId={setNewInteriorId} />
      </Fade>
      {/* </ReactSpring.FadeIn> */}
    </Box>
  )
}
