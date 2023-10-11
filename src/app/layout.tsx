import Header from '@/components/Header/Header'
import '@/styles/globals.scss'
import { Metadata } from 'next'
import Script from 'next/script'
import Home from './home.client'
import QueryProvider from './provider.client'

export const metadata: Metadata = {
  title: 'ModernDesign AI',
  description: 'AI Interior Designer Platform: Revolutionizing Interior Design!',
  viewport: 'width=device-width, initial-scale=1',

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

// const emotionCache = createEmotionCache()
// const emotionTheme = createTheme()

export default function Layout({ children }: { children: React.ReactNode }) {
  // const queryClient = getQueryClient()
  // await queryClient.prefetchInfiniteQuery(queryInteriors)
  // const dehydratedState = dehydrate(queryClient, {
  //   shouldDehydrateQuery: () => true,
  // })

  return (
    <html lang="en">
      <body>
        {/* <CacheProvider value={emotionCache}>
          <ThemeProvider theme={emotionTheme}>
        <CssBaseline /> */}

        <div className="flex w-screen h-screen flex-col">
          <Header />

          <QueryProvider>
            {/* <Hydrate state={dehydratedState}> */}
            <Home />
            {/* </Hydrate> */}

            {children}
          </QueryProvider>
        </div>
        {/* <StyleGallery /> */}
        {/* </ThemeProvider>
        </CacheProvider> */}

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B62T0MRV0M" strategy="afterInteractive" async />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-B62T0MRV0M');
        `}
        </Script>
      </body>
    </html>
  )
}
