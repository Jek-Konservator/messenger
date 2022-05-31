import React from "react";
import styles from "./Registration.module.css";

import axios from "axios";
import Form, { Field } from "rc-field-form";
import { Input } from "../../UIKit/inputs/Input/Input";
import { Button } from "../../UIKit/buttons/Button/Button";
import { IInitialRegistrationFormValues } from "./RegistrationType";
import { useRouter } from "next/router";


const initialFormValues: IInitialRegistrationFormValues = {
  login: "",
  password: "",
};

export const Registration = () => {
  const router = useRouter();

  const userRegistration = async (value: IInitialRegistrationFormValues) => {
    try {
      const { data } = await axios.get(
        `/api/users/newUser?login=${value.login}&password=${value.password}`
      );
      if (data.success) {
        router.push("/authorization");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Registration}>
      <h2 className={styles.RegistrationText}> Регистрация</h2>
      <Form
        className={styles.RegistrationForm}
        initialValues={initialFormValues}
        onFinish={(values) => {
          userRegistration(values);
        }}
      >
        <Field name="login">
          <Input placeholder="Логин" />
        </Field>
        <Field name="password">
          <Input placeholder="Пароль" />
        </Field>
        <Button >Зарегистрироваться</Button>
      </Form>
      <Button onClick={()=>  router.push("/authorization")}>Авторизоваться</Button>
    </div>
  );
};
