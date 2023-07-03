import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* {interiorItems.map((interior, ind) =>
          interior.renders.map((render, index) => (
            <link
              key={`${render.id}+${ind}+${index}`}
              rel="preload"
              href={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}`}
              as="image"
            />
          ))
        )} */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
