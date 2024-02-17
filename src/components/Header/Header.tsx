import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import XIcon from '@mui/icons-material/X'
import Image from 'next/image'
import Link from 'next/link'
import ColorButton from '../ColorButton/ColorButton'

export default function Header() {
  return (
    <div className="flex flex-wrap flex-grow p-4 items-center w-full bg-black">
      <Link className="flex justify-center" href="/">
        <Image src="/logo.svg" width={250} height={45} alt="Logo" className="w-[160px] md:w-[250px]" />
      </Link>
      {/* <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2> */}
      {/* <span>Design Your Space, Empower Your Life</span> */}

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

      <div className="flex flex-row justify-between items-center ml-auto w-24">
        <Link href="https://www.instagram.com/moderndesign_ai" target="_blank">
          <InstagramIcon />
        </Link>

        <Link href="https://www.linkedin.com/company/moderndesign-ai" target="_blank">
          <LinkedInIcon />
        </Link>

        <Link href="https://twitter.com/ModernDesignAI" target="_blank" className="[&>svg]:h-5">
          <XIcon />
        </Link>
      </div>

      <Link href="/interior/create" className="flex ml-auto mt-2 md:mt-0 md:ml-4">
        <ColorButton className="!font-semibold">
          <span className="relative z-10">
            Create <span className="hidden md:inline-block">Your Design For FREE</span>
            <span className="md:hidden">Design</span>
          </span>
          <span role="img" aria-label="Let's go!" style={{ fontSize: 16, marginLeft: 5 }}>
            ✨
          </span>
        </ColorButton>
      </Link>
    </div>
  )
}
