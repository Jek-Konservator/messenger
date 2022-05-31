import React, {

  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./Dialogs.module.css";
import { Input } from "../../UIKit/inputs/Input/Input";
import axios from "axios";
import { DialogPreview } from "./DialogPreview/DialogPreview";
import User from "../../store/user";


export const Dialogs = () => {
  const [value, setValue] = useState("");
  const [filteredValue, setFilteredValue] = useState("");

  const [users, setUsers] = useState([]);
  console.log(users);
  const [userDialogs, setUserDialogs] = useState([]);

  const [isPending, startTransition] = useTransition();

  const getUsers = useMemo(() => {
    return async () => {
      try {
        const { data } = await axios.get(`/api/users/getUsers`);
        if (data.success) {
          return data.users;
        } else {
          console.log(data.message);
          return [];
        }
      } catch (err) {
        console.log(err);
        return [];
      }
    };
  }, [users]);

  const getUserDialogs = async () => {
    try {
      const { data } = await axios.get(
        `/api/dialogs/getUserDialogs?userId=${User.userInfo.id}`
      );
      if (data.success) {
        setUserDialogs(data.userDialogs);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredValues = useMemo(async () => {
    !!value &&
      getUsers().then((data) => {
        setUsers(
          data.filter(
            ( // @ts-ignore
              user
            ) =>
              user.login.toLowerCase().includes(filteredValue) ||
              user._id.toLowerCase().includes(filteredValue)
          )
        );
      });
  }, [filteredValue]);

  useEffect(() => {
    getUserDialogs();
  }, []);

  return (
    <div className={styles.Dialogs}>
      <Input
        onChange={(e) => {
          setValue(e.target.value.toLowerCase());
          startTransition(() => setFilteredValue(e.target.value.toLowerCase()));
        }}
        placeholder="Поиск"
        style={{ width: "100%", margin: "0" }}
      />
      <div className={styles.DialogsDialogPreview}>
        {!!userDialogs && (
          <>
            <span className={styles.DialogsDialogPreviewText}>
              Ваши диалоги
            </span>
            {userDialogs.map((dialog) => (
              // @ts-ignore
              <DialogPreview key={dialog._id} dialog={dialog} />
            ))}
          </>
        )}
        {!!value && !isPending && (
          <>
            <span className={styles.DialogsDialogPreviewText}>
              Пользователи
            </span>
            {users.map((user) => (
              // @ts-ignore
              <DialogPreview key={user._id} user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
