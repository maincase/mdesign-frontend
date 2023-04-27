import interiorItems from '@/components/InteriorManager/interior-items'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {interiorItems.map((interior, ind) =>
          interior.images.map((image, index) => (
            <link key={`${image.img}+${ind}+${index}`} rel="preload" href={image.img} as="image" />
          ))
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
