import { DialogActions, DialogContent, DialogTitle, Dialog as MuiDialog } from '@mui/material'
import { ComponentPropsWithoutRef } from 'react'
import SlideTransition from './SlideTransition'

type Props = Omit<ComponentPropsWithoutRef<typeof MuiDialog>, 'title' | 'content' | 'actions'> & {
  title?: JSX.Element
  content?: JSX.Element
  actions?: JSX.Element
}

export default function Dialog({ open, onClose, title, content, actions }: Props) {
  return (
    <MuiDialog
      open={open}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </MuiDialog>
  )
}
