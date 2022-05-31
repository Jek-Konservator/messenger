import { dataDialogs } from "../../../database/database";

export default (req: any, res: any) => {
  const { dialogId } = req.query;

  dataDialogs.findOne({ _id: dialogId }, (err: any, docs: any) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (docs) {
        res
          .status(200)
          .json({ success: true, message: "dialogFound", dialog: docs });
      } else {
        res.status(200).json({ success: false, message: "dialogNotFound" });
      }
    }
  });
};
