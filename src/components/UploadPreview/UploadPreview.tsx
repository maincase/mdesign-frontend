import { css } from '@emotion/css'
import clsx from 'clsx'
import Image from 'next/image'

const styles = {
  imgContainer: css`
    max-height: 400px;
  `,
}

// async function imgSize(image: string) {
//   const im = new window.Image()
//   im.src = image

//   await new Promise((resolve) => {
//     im.onload = resolve
//   })

//   const scaleFactor = Math.max(1024 / im.width, 1024 / im.height)
//   const scaledWidth = im.width * scaleFactor
//   const scaledHeight = im.height * scaleFactor
//   const x = (1024 - scaledWidth) / 2
//   const y = (1024 - scaledHeight) / 2

//   console.log(im.width, im.height, 'this is the image', scaleFactor, scaledWidth, scaledHeight, x, y)

//   return {
//     im,
//     x,
//     y,
//     scaledWidth,
//     scaledHeight,
//   }
// }

type Props = {
  image: string
  label: string
}

export default function UploadPreview({ image, label }: Props) {
  // const canvasRef = useRef<HTMLDivElement>(null)

  // const addCanv = useCallback(async () => {
  //   const sz = await imgSize(image)

  //   const canvas = document.createElement('canvas')
  //   canvas.width = 1024
  //   canvas.height = 1024

  //   const context = canvas.getContext('2d')!

  //   // draw grey background
  //   context.fillStyle = '#333'
  //   context.fillRect(0, 0, canvas.width, canvas.height)

  //   context.drawImage(sz.im, sz.x, sz.y, sz.scaledWidth, sz.scaledHeight)

  //   canvasRef.current?.appendChild(canvas)
  // }, [])

  // addCanv()

  return (
    image && (
      <div className={clsx('group relative overflow-hidden rounded-xl flex', styles.imgContainer)}>
        <Image
          src={image}
          alt="preview"
          width={0}
          height={0}
          className="group-hover:scale-105 transition-scale duration-300 w-full block object-contain"
        />
        <span className="text-white transition-background duration-300 absolute w-full h-full flex items-center justify-center top-0 left-0 z-10 cursor-pointer bg-black bg-opacity-50 group-hover:bg-opacity-70">
          {label}
        </span>

        {/* <div ref={canvasRef}></div> */}
      </div>
    )
  )
}
