import React from "react";
import styles from "./style/style.module.scss";

const GalleryElement = ({ content }: {content: any}) => {
  return (
    <div className={styles.content_element}>
      <img src={content.img} alt={content.description} />
      <div className={styles.content_description}>{content.description}</div>
    </div>
  );
};

export default GalleryElement;
