import React, { FC, useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import axios from "axios";
import User from "../../../store/user";
import { Messages } from "./messages/Messages";
import Form, { Field } from "rc-field-form";
import { Textarea } from "../../../UIKit/inputs/Textarea/Textarea";
import { SendAMessageButton } from "../../../UIKit/buttons/SendAMessageButton/SendAMessageButton";
import { useSocket } from "../../../hooks/sockets/useSocket";

const initialFormValues = {
  newMessage: "",
};

export const Dialog: FC<{ dialog: any; messages: any }> = ({
  dialog,
  messages,
}) => {
  const [dialogMessages, setDialogMessages] = useState(messages);


  const socket = useSocket();

  const newMessage = async (values: any) => {
    try {
      const { data } = await axios.post(
        `/api/messages/newMessage?&dialogId=${dialog._id}&ownerId=${User.userInfo.id}`,
        {
          text: values.newMessage,
        }
      );
      if (data.success) {
        socket.emit("newMessage", { idDialog: dialog._id });
        // @ts-ignore
        value = "";
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const socketInit = () => {
    socket.on("newMessages", async ({ idDialog }) => {
      if (idDialog === dialog._id) {
        try {
          const { data } = await axios.get(
            `/api/messages/getMessagesDialog?dialogId=${idDialog}`
          );

          if (data.success) {
            setDialogMessages(data.dialogMessages);
          }
        } catch (error) {}
      }
    });
  };

  useEffect(() => {
    socket.emit("joinDialog", { idDialog: dialog._id });
    socketInit();
  }, []);

  return (
    <div className={styles.Dialog}>
      <Messages messages={dialogMessages} />
      <Form
        className={styles.DialogForm}
        initialValues={initialFormValues}
        onFinish={(values) => {
          newMessage(values);
        }}
      >
        <Field name="newMessage">
          <Textarea
            style={{ width: "500px" }}
            placeholder="Новое сообщение"
          />
        </Field>
        <SendAMessageButton />
      </Form>
    </div>
  );
};
