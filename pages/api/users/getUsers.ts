import { dataUsers } from "../../../database/database";

export default (req: any, res: any) => {
  dataUsers.find({}, (err: any, docs: any) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({ success: true, message: "users", users: docs });
      } else {
        res.status(200).json({ success: false, message: "usersNot" });
      }
    }
  });
};
