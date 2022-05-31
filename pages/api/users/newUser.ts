import { dataUsers } from "../../../database/database";

export default (req:any, res:any) => {
  const { login, password } = req.query;
  dataUsers.findOne({ login, password }, (err:any, docs:any) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (docs) {
        res.status(200).json({success:false, message: "loginUsed" });
      } else {
        dataUsers.insert({ login, password });
        res.status(201).json({success:true, message: "createUser" });
      }
    }
  });
};
