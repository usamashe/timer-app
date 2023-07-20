import React from "react";
import styles from "./Header.module.css";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h1" className={styles.title}>
        Timer App
      </Typography>
    </div>
  );
};

export default Header;
