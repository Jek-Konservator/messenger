import { dataDialogs } from "../../../database/database";

export default (req: any, res: any) => {
  const { userId } = req.query;

  dataDialogs.find(
    {$or:[{idUserTwo: userId},{idUserOne: userId}]  },
    (err: any, docs: any) => {
      if (err) {
        res.status(404).json(err);
      } else {
        if (!!docs) {
          res.status(200).json({
            success: true,
            message: "userDialogsFound",
            userDialogs: docs,
          });
        } else {
          res
            .status(200)
            .json({ success: false, message: "userDialogsNotFound" });
        }
      }
    }
  );
};
