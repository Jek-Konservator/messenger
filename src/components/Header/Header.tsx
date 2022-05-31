import React from "react";
import styles from "./Header.module.css";

import { ExitPicture } from "../../pictures/ExitPicture/ExitPicture";
import { useUserLogOut } from "../../hooks/Users/UserLogOut";

export const Header = () => {
  const userLogOut = useUserLogOut();

  return (
    <div className={styles.Header}>
      <span className={styles.HeaderText}>MESSENGER</span>
      <ExitPicture onClick={() => userLogOut()} />
    </div>
  );
};
