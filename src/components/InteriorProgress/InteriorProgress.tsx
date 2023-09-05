import { useQueryInterior, useQueryInteriors } from '@/api/query-hooks/interior'
import { useAppState } from '@/state/app/AppState'
import { useInteriorItems } from '@/state/interior/useInteriorItems'
import { DialogContent, FadeProps } from '@mui/material'
import { useRouter } from 'next/navigation'
import { forwardRef, startTransition, useEffect } from 'react'
import CircleProgress from '../CircleProgress/CircleProgress'

type Props = { newInteriorId?: string; setNewInteriorId: (id?: string) => void } & Omit<FadeProps, 'children'>

function InteriorProgress({ newInteriorId, setNewInteriorId, ...props }: Props, ref: React.Ref<HTMLElement>) {
  const router = useRouter()

  const { fetchNextPage } = useQueryInteriors()

  const { unshift: unshiftInteriors } = useInteriorItems()

  const { data: newInterior } = useQueryInterior(newInteriorId, 1000, !newInteriorId)

  const { setRunConfetti } = useAppState()

  useEffect(() => {
    // Update UI after rendering finished
    if (newInterior?.progress === 100 && !!newInterior.renders && newInterior.renders.length > 0) {
      // Run success confetti animation on finish
      setRunConfetti(true)

      // Clear new interior id to stop polling
      startTransition(() => setNewInteriorId(undefined))

      // Remove interior from persistent storage
      sessionStorage.removeItem('renderInteriorId')

      unshiftInteriors(newInterior)

      fetchNextPage()

      // After successful render we push to view the new interior
      /**
       * NOTE: Pathname change also triggers the confetti animation, this might not be the best approach,
       *        but should be good for now.
       */
      router.push(`/interior/${newInterior.id}?new=1`)
    }
  }, [newInterior])

  return (
    <DialogContent
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 600,
      }}
      {...props}
      ref={ref}
    >
      <CircleProgress value={newInterior?.progress ?? 0} />
    </DialogContent>
  )

  {
    /* <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography className="flex mt-4">Your new interior is being rendered...</Typography>
      </DialogActions> */
  }
}

export default forwardRef<HTMLElement, Props>(InteriorProgress)
