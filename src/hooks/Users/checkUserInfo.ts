import { getCookie, removeCookies, setCookies } from "cookies-next";
import User from "../../store/user";
import axios from "axios";
import { useRouter } from "next/router";


export const useCheckUserInfo = () => {
  const router = useRouter();
  return async () => {
    try {
      const { data } = await axios.get(
        `/api/users/getUserInfo?userId=${getCookie("userId")}`
      );

      if (data.success) {
        setCookies("userLogin", data.userInfo.login);
        setCookies("userId", data.userInfo._id);
        User.setUserInfo({
          login: data.userInfo.login,
          id: data.userInfo._id,

        });
      } else {
        removeCookies("userLogin");
        removeCookies("userId");
        User.clearUserInfo();
        !(
          router.route === "/registration" || router.route === "/authorization"
        ) && router.push("/authorization");
        console.log(data.message);
      }
    } catch (err) {
      !(
        router.route === "/registration" || router.route === "/authorization"
      ) && router.push("/authorization");
      console.log(err);
    }
  };
};
