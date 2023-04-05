import { Button } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import styles from './Header.module.scss'

type Props = ComponentPropsWithoutRef<'div'> & {
  openNewRenderModal: () => void
}

export default function Header({ openNewRenderModal }: Props) {
  return (
    <div className={styles.header}>
      <Link href="/">Modern Design AI</Link>
      {/* <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2> */}
      <div className={styles.header_right}>
        {/* <Button className={clsx(styles.billing_button, styles.button)} variant="text" sx={{ textTransform: 'none' }}>
          Billing
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: 'none',
          }}
          className={clsx(styles.button_animation, styles.button)}
        >
          Upgrade to Pro
        </Button> */}
        <Button className={clsx(styles.button_animation, styles.button)} onClick={openNewRenderModal}>
          Create New Render
        </Button>
      </div>
    </div>
  )
}
