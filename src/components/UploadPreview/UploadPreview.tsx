import { css } from '@emotion/css'
import Image from 'next/image'

type Props = {
  image: string
  label: string
}

export default function UploadPreview({ image, label }: Props) {
  return (
    image && (
      <div className="group relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt="preview"
          width={0}
          height={0}
          className="group-hover:scale-105 transition-scale duration-300 w-full block"
        />
        <span className="text-white transition-background duration-300 absolute w-full h-full flex items-center justify-center top-0 left-0 z-10 cursor-pointer bg-black bg-opacity-50 group-hover:bg-opacity-70">
          {label}
        </span>
      </div>
    )
  )
}
