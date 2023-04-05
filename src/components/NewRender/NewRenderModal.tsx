import { Backdrop, Modal } from '@mui/material'
import { ComponentPropsWithoutRef } from 'react'
import Fade from '../Fade/Fade'

type Props = ComponentPropsWithoutRef<typeof Modal> & {
  open: boolean
}

export default function NewRenderModal({ children, open, onClose }: Props) {
  return (
    <Modal
      aria-labelledby="new-render-modal-title"
      aria-describedby="new-render-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>{children}</Fade>
    </Modal>
  )
}
