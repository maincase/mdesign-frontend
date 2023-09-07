'use client'

import { Box, Button } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <Box
      className={clsx(
        'flex flex-grow p-8 items-center justify-between absolute z-20 top-0 left-0 w-full',
        styles.header
      )}
    >
      <Link className="flex justify-center" href="/">
        <Image src="/logo.svg" width={250} height={45} alt="Logo" className="w-[160px] md:w-[250px]" />
      </Link>
      {/* <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2> */}
      {/* <span>Design Your Space, Empower Your Life</span> */}
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

        <Link href="/interior/create" className="block">
          <Button className="!text-white !font-[Montserrat] !font-semibold !rounded-none !bg-black">
            <span className="relative z-10">
              Create <span className="hidden md:inline-block">Your Design For FREE</span>
              <span className="md:hidden">Design</span>
            </span>
          </Button>
        </Link>
      </div>
    </Box>
  )
}
