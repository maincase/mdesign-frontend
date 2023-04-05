import GalleryElement from '../GalleryElement/GalleryElement'
import styles from './StyleGallery.module.scss'

const interiorElementsList = [
  {
    id: 1,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Easter',
  },
  {
    id: 2,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Modern',
  },
  {
    id: 3,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Minimalist',
  },
  {
    id: 4,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Contemporary',
  },
  {
    id: 5,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Scandinavian',
  },
  {
    id: 6,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Easter',
  },
  {
    id: 7,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Modern',
  },
  {
    id: 8,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Minimalist',
  },
  {
    id: 9,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Contemporary',
  },
  {
    id: 10,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Scandinavian',
  },
  {
    id: 11,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Scandinavian',
  },
  {
    id: 12,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Scandinavian',
  },
  {
    id: 13,
    img: 'https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp',
    description: 'Scandinavian',
  },
]

export default function StyleGallery() {
  return (
    <div className={styles.style_gallery}>
      {interiorElementsList.map((el) => {
        return <GalleryElement key={el.id} content={el} />
      })}
    </div>
  )
}
