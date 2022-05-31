import { makeAutoObservable } from "mobx";
import { IUserInfo } from "./userTypes";

class User {
  userInfo: IUserInfo = { login: "", id: ""};
  constructor() {
    makeAutoObservable(this);
  }

  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }
  clearUserInfo() {
    this.userInfo = { login: "", id: "" };
  }
}

export default new User();
