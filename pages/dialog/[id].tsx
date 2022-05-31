import { Dialog } from "../../src/components/Dialogs/Dialog/Dialog";
import axios from "axios";

import {FC} from "react";

// TODO в indexnom file диалог не выбрал

const DialogSelected:FC<{dialog: any, messages: any}> = ({dialog, messages}) => {
  return <Dialog dialog={dialog} messages={messages} />;
};

export async function getServerSideProps(context: any) {
  try {
    const  dialogData = await axios.get(
      `/api/dialogs/getDialog?dialogId=${context.query.id}`
    );
    const  messagesData  = await axios.get(
      `/api/messages/getMessagesDialog?dialogId=${dialogData.data.dialog._id}`
    );
    if (dialogData.data.success && messagesData.data.success) {
      return {
        props: {
          dialog: dialogData.data.dialog,
          messages: messagesData.data.dialogMessages,
        },
      };
    } else {
      return {
        props: { error: "err" },
      };
    }
  } catch (error) {
    return {
      props: { error: "err" },
    };
  }
}

export default DialogSelected;
//todo доделать запрос сообщений
