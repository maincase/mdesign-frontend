import { Grid } from "@mui/material";
import styles from "./style/style.module.scss";

const GalleryElement = ({ content }) => {
  return (
    <div className={styles.content_element}>
      <img src={content.img} alt={content.description} />
      <div className={styles.content_description}>{content.description}</div>
    </div>
  );
};

export default GalleryElement;
