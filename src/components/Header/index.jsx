import { Button } from "@mui/material";
import React from "react";
import styles from "./style/style.module.scss";
const Header = () => {
  return (
    <div className={styles.header}>
      <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2>
      <div className={styles.header_right}>
        <Button variant="text" sx={{ textTransform: "none" }}>
          Billing
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
          }}
          className={styles.button_animation}
        >
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
};

export default Header;
