import { Grid } from '@mui/material'
import ContentElement from '../ContentElement/ContentElement'
import styles from './Content.module.scss'

const interiorElementsList = [
  {
    id: 0,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (15s ago, took 6s)',
  },
  {
    id: 1,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (12s ago, took 6s)',
  },
  {
    id: 2,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (16s ago, took 6s)',
  },
  {
    id: 3,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (19s ago, took 6s)',
  },
  {
    id: 4,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (11s ago, took 6s)',
  },
  {
    id: 5,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (11s ago, took 6s)',
  },
  {
    id: 6,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (11s ago, took 6s)',
  },
  {
    id: 7,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (11s ago, took 6s)',
  },
  {
    id: 8,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Original Bath Room (11s ago, took 6s)',
  },
]

export default function Content() {
  return (
    <div className={styles.content_wrapper}>
      <h3>Latest renders</h3>
      <Grid className={styles.interior_content} container columnSpacing={{ xs: 1, sm: 2, md: 0 }}>
        {interiorElementsList.map((el) => (
          <ContentElement key={el.id} content={el} />
        ))}
      </Grid>
    </div>
  )
}
