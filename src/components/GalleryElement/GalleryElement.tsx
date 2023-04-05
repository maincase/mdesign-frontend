import Image from 'next/image'
import styles from './GalleryElement.module.scss'

export default function GalleryElement({ content }: { content: any }) {
  return (
    <div className={styles.content_element}>
      <Image width={100} height={100} src={content.img} alt={content.description} />
      <div className={styles.content_description}>{content.description}</div>
    </div>
  )
}
