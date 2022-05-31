import React, { FC } from "react";
import styles from "./Messages.module.css";
import { Message } from "./message/Message";
import User from "../../../../store/user";

export const Messages: FC<{ messages: any }> = ({ messages }) => {
  return (
    <div className={styles.Messages}>
      {messages.map((message: any) => (
        <div
          key={message._id}
          className={`
          ${styles.MessagesMessage} ${
            message.ownerId === User.userInfo.id && styles.MessagesMessageUser
          }
          `}
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};
