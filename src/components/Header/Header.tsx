'use client'

import { Box, Button } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <Box className={clsx('flex flex-grow px-4 items-center justify-between', styles.header)}>
      <Link className={clsx('flex justify-center', styles.logo)} href="/">
        ModernDesign
      </Link>
      {/* <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2> */}
      <span>Design Your Space, Empower Your Life</span>
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

        <Link href="/create">
          <Button className={clsx(styles.button_animation, styles.button)}>Create Your Design For FREE</Button>
        </Link>
      </div>
    </Box>
  )
}
