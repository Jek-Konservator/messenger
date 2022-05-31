import { dataUsers } from "../../../database/database";
import { setCookies } from "cookies-next";

export default (req:any, res:any) => {
  const { login, password } = req.query;
  dataUsers.findOne({ login, password }, (err:any, docs:any) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        setCookies("userId", docs._id, { req, res });
        setCookies("userLogin", docs.login, { req, res });
        res
          .status(200)
          .json({ success: true, message: "userAccepted", userInfo: docs });
      } else {
        res.status(200).json({ success: false, message: "userNotAccepted" });
      }
    }
  } );
};
