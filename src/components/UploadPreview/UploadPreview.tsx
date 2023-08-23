import Image from 'next/image'
import { css } from '@emotion/css'

type Props = {
  image: string
  label: string
}

const styles = {
  wrapper: css`
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    margin: 10px 0;
    &:hover img {
      transform: scale(1.1);
    }
  `,
  image: css`
    width: 100%;
    height: auto;
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  `,
  label: css`
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: white;
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  `,
}

export default function UploadPreview({ image, label }: Props) {
  return (
    image && (
      <div className={`${styles.wrapper}`}>
        <Image src={image} alt="preview" width={0} height={0} className={`${styles.image}`} />
        <span className={`${styles.label}`}>{label}</span>
      </div>
    )
  )
}
