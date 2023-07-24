import { useQueryInterior, useQueryInteriors } from '@/api/query-hooks/Interior'
import { useInteriorItems } from '@/components/InteriorManager/useInteriorItems'
import { Box, CircularProgress, DialogContent, FadeProps, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { forwardRef, startTransition, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

type Props = { newInteriorId?: string; setNewInteriorId: (id?: string) => void } & Omit<FadeProps, 'children'>

export default forwardRef<HTMLElement, Props>(function InteriorProgress(
  { newInteriorId, setNewInteriorId, ...props },
  ref
) {
  const { width, height } = useWindowSize()

  const router = useRouter()

  const { fetchNextPage } = useQueryInteriors()

  const { unshift: unshiftInteriors } = useInteriorItems()

  const { data: newInterior } = useQueryInterior(newInteriorId, 1000, !newInteriorId)

  useEffect(() => {
    // Update UI after rendering finished
    if (newInterior?.progress === 100 && !!newInterior.renders && newInterior.renders.length > 0) {
      // Clear new interior id to stop polling
      startTransition(() => setNewInteriorId(undefined))

      // Remove interior from persistent storage
      localStorage.removeItem('renderInteriorId')

      unshiftInteriors(newInterior)

      fetchNextPage()

      router.push(`/interior/${newInterior.id}`)
    }
  }, [newInterior])

  return (
    <DialogContent
      sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      {...props}
      ref={ref}
    >
      <Box width="50%" height="50%" position="relative">
        <CircularProgress
          size="100%"
          variant="determinate"
          value={newInterior?.progress ?? 0} /* style={{ width: '100%' }} */
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
            newInterior?.progress ?? 0
          )}%`}</Typography>
        </Box>
      </Box>

      <Confetti width={width} height={height} />
    </DialogContent>
  )
})
