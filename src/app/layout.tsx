import Header from '@/components/Header/Header'
import '@/styles/globals.scss'
import theme from '@/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { Metadata, Viewport } from 'next'
import { Alegreya, Montserrat, Noto_Sans_Georgian } from 'next/font/google'
import Script from 'next/script'
import HydrateHome from './hydrate-home'
import QueryProvider from './provider.client'

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const noto_sans_georgian = Noto_Sans_Georgian({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-georgian',
})

export const metadata: Metadata = {
  title: 'ModernDesign AI',
  description: 'AI Interior Designer Platform: Revolutionizing Interior Design!',
  // viewport: 'width=device-width, initial-scale=1',

  /* {interiorItems.map((interior, ind) =>
          interior.renders.map((render, index) => (
            <link
              key={`${render.id}+${ind}+${index}`}
              rel="preload"
              href={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}`}
              as="image"
            />
          ))
        )} */
}

export const viewport: Viewport = {
  width: 'device-width, initial-scale=1',
  // height: 'device-height',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${alegreya.variable} ${montserrat.variable} ${noto_sans_georgian.variable}`}>
      <StyledEngineProvider injectFirst>
        <AppRouterCacheProvider
          options={{
            key: 'css',
            // enableCssLayer: true,
            prepend: true,
          }}
        >
          <ThemeProvider theme={theme}>
            <body>
              {/* <CacheProvider value={emotionCache}>
          <ThemeProvider theme={emotionTheme}>
        <CssBaseline /> */}

              <div className="flex w-screen h-screen flex-col">
                <Header />

                <QueryProvider>
                  <HydrateHome />

                  {children}
                </QueryProvider>
              </div>
              {/* <StyleGallery /> */}
              {/* </ThemeProvider>
        </CacheProvider> */}

              <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-B62T0MRV0M"
                strategy="afterInteractive"
                async
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-B62T0MRV0M');
        `}
              </Script>
            </body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StyledEngineProvider>
    </html>
  )
}
