import React, { FC } from "react";
import styles from "./SendAMessageButton.module.css";

import { TSendAMessageButton } from "./SendAMessageButtonType";
import { SendAMessagePicture } from "../../../pictures/SendAMessagePicture/SendAMessagePicture";
import { Button } from "../Button/Button";
export const SendAMessageButton: FC<TSendAMessageButton> = (props) => {
  return (
    <Button className={styles.SendAMessageButton}>
      <SendAMessagePicture />
    </Button>
  );
};
// TODO: картинки все в SVG компонентах реает const HuiIcon = () =>{ return<svg></svg>}