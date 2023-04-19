import interiorItems from '@/components/Content/interior-items'
import predictionItems from '@/components/Content/prediction-items'
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
        {predictionItems.map((prediction, ind) => (
          <link key={`${prediction.name}+${ind}`} rel="preload" href={prediction.name} as="image" />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
