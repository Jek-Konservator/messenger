import { removeCookies } from "cookies-next";
import User from "../../store/user";

import { useRouter } from "next/router";



export const useUserLogOut = () => {
  const router = useRouter();
  return () => {
    removeCookies("userId");
    removeCookies("userLogin");
    User.setUserInfo({ login: "", id: "" });
    router.push("/authorization");
  };
};
