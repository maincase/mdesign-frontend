import Image from 'next/image'
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
      {interiorElementsList.map((el) => (
        <div key={el.id} className={styles.content_element}>
          <Image width={100} height={100} src={el.img} alt={el.description} />
          <div className={styles.content_description}>{el.description}</div>
        </div>
      ))}
    </div>
  )
}
