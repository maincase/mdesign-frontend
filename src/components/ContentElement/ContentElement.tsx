import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './ContentElement.module.scss'

export default function ContentElement({ content }: { content: any }) {
  return (
    <Grid className={styles.content_element} xs={6} item={true}>
      <div className={styles.content_description}>{content.description}</div>
      <div className="w-full h-full relative">
        <Image src={content.img} alt={content.description} fill className="object-contain" />
      </div>
    </Grid>
  )
}
