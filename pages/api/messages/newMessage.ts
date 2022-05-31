import { dataMessages } from "../../../database/database";

export default (req: any, res: any) => {
  const { dialogId, ownerId } = req.query;
  const { text } = req.body;
  dataMessages.insert(
    { text, dialogId, ownerId, createDate: Date.now() },
    (err: any, newDoc: any) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(201).json({
          success: true,
          message: "createMessage",
          createdMessage: newDoc,
        });
      }
    }
  );
};
