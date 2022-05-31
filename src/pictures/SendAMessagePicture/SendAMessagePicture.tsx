import React, { FC } from "react";
import styles from "./SendAMessagePicture.module.css";
import Image from "next/image";
import SendAMessage from "./send a message.png";
import { TSendAMessagePicture } from "./SendAMessagePictureType";

export const SendAMessagePicture: FC<TSendAMessagePicture> = (props) => {
  return (
    <Image
      className={styles.SendAMessagePicture}
      width={50}
      height={50}
      layout="intrinsic"
      src={SendAMessage}
      alt="SendAMessagePicture"
      {...props}
    />
  );
};
