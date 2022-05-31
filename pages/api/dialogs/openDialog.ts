import { dataDialogs } from "../../../database/database";

export default (req: any, res: any) => {
  const { idUserOne, idUserTwo } = req.query;

  dataDialogs.findOne(
    {
      $or: [
        { $and: [{ idUserOne }, { idUserTwo }] },
        { $and: [{ idUserOne: idUserTwo }, { idUserTwo: idUserOne }] },
      ],
    },
    (err: any, docs: any) => {
      if (err) {
        res.status(404).json(err);
      } else {
        if (docs) {
          res.status(200).json({
            success: true,
            message: "dialogExists",
            dialogInfo: docs,
          });
        } else {
          dataDialogs.insert(
            { idUserOne, idUserTwo },
            (err: any, docs: any) => {
              res.status(201).json({
                success: true,
                message: "createDialog",
                dialogInfo: docs,
              });
            }
          );
        }
      }
    }
  );
};
//todo доделать создание диалога (проблема передать массив из нескольких пользователей)
