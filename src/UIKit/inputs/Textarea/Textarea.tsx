import React, { FC } from "react";
import styles from "./Textarea.module.css";
import { TTextarea } from "./TextareaType";
import TextareaAutosize from "react-textarea-autosize";

export const Textarea: FC<TTextarea> = (props) => {
  return (
    // @ts-ignore
    <TextareaAutosize
      minRows={2}
      maxRows={25}
      className={styles.Textarea}
      {...props}
    />
  );
};
