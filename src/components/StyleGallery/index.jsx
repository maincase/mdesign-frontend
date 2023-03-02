import React from "react";
import GalleryElement from "../../elements/GalleryElement";
import styles from "./style/style.module.scss";
const interiorElementsList = [
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Easter",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Modern",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Minimalist",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Contemporary",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Scandinavian",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Easter",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Modern",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Minimalist",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Contemporary",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Scandinavian",
  },
];
const StyleGallery = () => {
  return (
    <div className={styles.style_gallery}>
        {interiorElementsList.map((el) => {
          return <GalleryElement key={el.description} content={el} />;
        })}
      
    </div>
  );
};

export default StyleGallery;
