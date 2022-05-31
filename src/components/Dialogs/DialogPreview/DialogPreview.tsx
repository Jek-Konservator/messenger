import React, { useEffect, useState } from "react";
import styles from "./DialogPreview.module.css";
import User from "../../../store/user";
import axios from "axios";
import { useRouter } from "next/router";
import { getUserInfo } from "../../../functions/users/getUserInfo";

export const DialogPreview = ({ user, dialog }: any) => {
  const [userInfo, setUserInfo] = useState(!!user ? user : {});

  const router = useRouter();

  const openDialog = async () => {
    try {
      const { data } = await axios.get(
        `/api/dialogs/openDialog?idUserOne=${userInfo._id}&idUserTwo=${User.userInfo.id}`
      );
      if (data.success) {
        router.push(`/dialog/${data.dialogInfo._id}`);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    !!dialog &&
      getUserInfo(
        dialog.idUserOne === User.userInfo.id
          ? dialog.idUserTwo
          : dialog.idUserOne
      ).then((data) => setUserInfo(data));
  }, []);

  return (
    <div
      onClick={() => {
        openDialog();
      }}
      className={styles.DialogPreview}
    >
      {userInfo.login}

    </div>
  );
};
