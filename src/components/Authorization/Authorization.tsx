import React from "react";
import styles from "./Authorization.module.css";
import { Input } from "../../UIKit/inputs/Input/Input";
import { Button } from "../../UIKit/buttons/Button/Button";
import Form, { Field } from "rc-field-form";
import axios from "axios";
import { IInitialAuthorizationFormValues } from "./AuthorizationType";
import { useRouter } from "next/router";
import User from "../../store/user";

const initialFormValues: IInitialAuthorizationFormValues = {
  login: "",
  password: "",
};

export const Authorization = () => {
  const router = useRouter();

  const userAuthorization = async (value: IInitialAuthorizationFormValues) => {
    try {
      const { data } = await axios.get(
        `/api/users/checkUser?login=${value.login}&password=${value.password}`
      );
      if (data.success) {
        User.setUserInfo({
          login: data.userInfo.login,
          id: data.userInfo._id,
        });
        router.push("/");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Authorization}>
      <h2 className={styles.AuthorizationText}> Авторизация</h2>
      <Form
        className={styles.AuthorizationForm}
        initialValues={initialFormValues}
        onFinish={(values) => {
          userAuthorization(values);
        }}
      >
        <Field name="login">
          <Input placeholder="Логин" />
        </Field>
        <Field name="password">
          <Input placeholder="Пароль" />
        </Field>
        <Button>Войти</Button>
      </Form>
      <Button onClick={() => router.push("/registration")}>
        Зарегистрироваться
      </Button>
    </div>
  );
};
