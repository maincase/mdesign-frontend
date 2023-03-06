import { Button } from "@mui/material";
import classNames from "classnames";
import React from "react";
import styles from "./style/style.module.scss";
const Header = () => {
  return (
    <div className={styles.header}>
      <h1>
        Interior AI
      </h1>
      <h2>INTERIOR DESIGN MOCKUPS AND VIRTUAL STAGING BY AI</h2>
      <div className={styles.header_right}>
        <Button
          className={classNames(styles.billing_button, styles.button)}
          variant="text"
          sx={{ textTransform: "none" }}
        >
          Billing
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
          }}
          className={classNames(styles.button_animation, styles.button)}
        >
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
};

export default Header;
