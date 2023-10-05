import Image from 'next/image'
import Link from 'next/link'
import ColorButton from '../ColorButton/ColorButton'

export default function Header() {
  return (
    <div className="flex p-2 md:p-4 items-center justify-between w-full bg-black">
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
          <ColorButton className="font-semibold">
            <span className="relative z-10">
              Create <span className="hidden md:inline-block">Your Design For FREE</span>
              <span className="md:hidden">Design</span>
            </span>
            <span role="img" aria-label="Let's go!" style={{ fontSize: 18, marginLeft: 5 }}>
              ✨
            </span>
          </ColorButton>
        </Link>
      </div>
    </div>
  )
}
