import { dataMessages } from "../../../database/database";

export default (req: any, res: any) => {
  const { dialogId } = req.query;
  dataMessages.find({ dialogId }, (err: any, docs: any) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({
          success: true,
          message: "messagesFound",
          dialogMessages: docs
            .sort((a: any, b: any) => {
              return a.createDate - b.createDate;
            })
            .reverse(),
        });
      } else {
        res.status(200).json({ success: false, message: "messagesNotFound" });
      }
    }
  });
};
export {};
