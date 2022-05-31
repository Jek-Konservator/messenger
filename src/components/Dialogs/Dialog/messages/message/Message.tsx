import React from "react";
import styles from "./Message.module.css";

export const Message = ({ message }: any) => {
  return (
    <div style={{ width: "fit-content" }}>
      <div className={styles.Message}>{message.text}</div>
    </div>
  );
};
