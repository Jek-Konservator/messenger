import React, { FC, useEffect, useMemo } from "react";
import "../src/GlobalStyle.css";
// @ts-ignore TODO
import styles from "./App.module.css";
import { Header } from "../src/components/Header/Header";
import { Dialogs } from "../src/components/Dialogs/Dialogs";
import User from "../src/store/user";

import { observer } from "mobx-react-lite";
import axios from "axios";
import { useCheckUserInfo } from "../src/hooks/Users/checkUserInfo";
import { useRouter } from "next/router";
import "./scroll.css";

axios.defaults.baseURL = "http://localhost:3000/";

const MyApp: FC<{ Component: any; pageProps: any }> = observer(
  ({ Component, pageProps }) => {
    const router = useRouter();
    const checkUserInfo = useCheckUserInfo();

    useEffect(() => {
      checkUserInfo();
    }, [router.asPath]);

    return (
      <div>
        {!User.userInfo.login && <Component {...pageProps} />}
        {!!User.userInfo.login && (
          <>
            <Header />
            <div className={styles.MainContainer}>
              <Dialogs />
              <div className={styles.MainContainerDialog}>
                <Component {...pageProps} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
export default MyApp;
