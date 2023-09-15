'use client'

import { Box, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <Box className="flex flex-grow p-6 items-center justify-between absolute z-20 top-0 left-0 w-full bg-black bg-opacity-80">
      <Link className="flex justify-center" href="/">
        <Image src="/logo.svg" width={250} height={45} alt="Logo" className="w-[160px] md:w-[250px]" />
      </Link>
      {/* <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2> */}
      {/* <span>Design Your Space, Empower Your Life</span> */}
      <div>
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
          <Button className="!text-white !font-[Montserrat] !font-semibold  !bg-black rounded-sm hover:!bg-[#211c1c]">
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
