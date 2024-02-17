import { useCallback, useRef } from 'react'

export const turnstileDomID = 'captcha'

export default function useTurnstile() {
  const turnstileReady = useRef(false)

  const turnstileVisible = (visible: boolean) => {
    document.getElementById(turnstileDomID)?.classList.remove(visible ? 'hidden' : 'show')
    document.getElementById(turnstileDomID)?.classList.add(visible ? 'show' : 'hidden')
  }

  return useCallback(async () => {
    if (!turnstileReady.current) {
      turnstileReady.current = true

      turnstileVisible(true)

      return new Promise<string>((resolve) => {
        const turnstile = (window as any)?.turnstile

        turnstile.render(`#${turnstileDomID}`, {
          // sitekey: '0x4AAAAAAASDhSdIKQWnqQVh',
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY,
          callback: (token: string) => {
            setTimeout(() => {
              // turnstileVisible(false)
              resolve(token)
            }, 1000)
          },
        })
      })
    }
  }, [])
}
