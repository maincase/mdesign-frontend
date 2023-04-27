import { DialogActions, DialogContent, DialogContentClasses, DialogTitle, Dialog as MuiDialog } from '@mui/material'
import { ComponentPropsWithoutRef } from 'react'
import SlideTransition from './SlideTransition'

type Props = Omit<ComponentPropsWithoutRef<typeof MuiDialog>, 'title' | 'content' | 'actions'> & {
  title?: JSX.Element
  content?: JSX.Element
  actions?: JSX.Element

  contentClasses?: Partial<DialogContentClasses>
}

export default function Dialog({ open, onClose, title, content, contentClasses, children, actions, ...props }: Props) {
  return (
    <MuiDialog
      open={open}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      {...props}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent classes={contentClasses}>{content ?? children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </MuiDialog>
  )
}
