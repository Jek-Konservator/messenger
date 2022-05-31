import { dataUsers } from "../../../database/database";
import { getCookie } from "cookies-next";

export default (req: any, res: any) => {
  const { userId } = req.query;
  dataUsers.findOne({ _id: userId }, (err: any, docs: any) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (!!docs) {
        res
          .status(200)
          .json({ success: true, message: "userFound", userInfo: docs });
      } else {
        res.status(200).json({ success: false, message: "userNotFound" });
      }
    }
  });
};
export {};
