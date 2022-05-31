import React, {FC} from "react";
import styles from "./ExitPicture.module.css";
import Image from "next/image";
import Exit from "./exit.png";
import { TExitPicture } from "./ExitPictureType";

export const ExitPicture:FC<TExitPicture> = (props) => {
  return (
    <Image
      className={styles.ExitPicture}
      width={25}
      height={25}
      layout="intrinsic"
      src={Exit}
      alt="ExitPicture"
      {...props}
    />
  );
};
