import { Grid } from "@mui/material";
import styles from "./style/style.module.scss";

const ContentElement = ({ content }) => {
  return (
    <Grid className={styles.content_element} xs={6} item={true}>
      <div className={styles.content_description}>{content.description}</div>
      <img src={content.img} alt={content.description} />
    </Grid>
  );
};

export default ContentElement;
