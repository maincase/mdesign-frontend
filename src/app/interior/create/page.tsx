'use client'

import InteriorProgress from '@/components/InteriorProgress/InteriorProgress'
import { Box, Fade } from '@mui/material'
import { useState } from 'react'
import InteriorForm from '../../../components/InteriorForm/InteriorForm'

export default function Page() {
  const [newInteriorId, setNewInteriorId] = useState<string | undefined>(
    typeof window !== 'undefined' ? localStorage?.getItem('renderInteriorId') ?? undefined : undefined
  )

  return (
    <Box
      sx={{
        minHeight: 700,
        // width: 600,
        overflow: 'hidden',
        display: 'flex',
        // flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
    </Box>
  )
}
