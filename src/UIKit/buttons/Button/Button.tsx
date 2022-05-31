import React from "react";
import styles from "./Button.module.css";
import { TButton } from "./ButtonType";
export const Button = (props: TButton) => {
  return <button className={styles.Button} {...props} />;
};
