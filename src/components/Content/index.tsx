import { Grid } from "@mui/material";
import React from "react";
import ContentElement from "../../elements/ContentElement";
import styles from "./style/style.module.scss";

const interiorElementsList = [
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Original Bath Room (15s ago, took 6s)",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Original Bath Room (12s ago, took 6s)",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Original Bath Room (16s ago, took 6s)",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Original Bath Room (19s ago, took 6s)",
  },
  {
    img: "https://actionaidrecycling.org.uk/wp-content/uploads/2021/01/johann-siemens-EPy0gBJzzZU-unsplash-1208x800.webp",
    description: "Original Bath Room (11s ago, took 6s)",
  },
];

const Content = () => {
  return (
    <div className={styles.content_wrapper}>
      <h3>Latest renders</h3>
      <Grid
        className={styles.interior_content}
        container
        columnSpacing={{ xs: 1, sm: 2, md: 0 }}
      >
        {interiorElementsList.map((el) => {
          return <ContentElement key={el.description} content={el} />;
        })}
      </Grid>
    </div>
  );
};

export default Content;
