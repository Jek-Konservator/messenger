let Datastore = require("nedb");
let dataDialogs = new Datastore({
  filename: "./database/datafile/dialogs.db",
  autoload: true,
});
let dataUsers = new Datastore({
  filename: "./database/datafile/users.db",
  autoload: true,
});
let dataMessages = new Datastore({
  filename: "./database/datafile/messages.db",
  autoload: true,
});

dataDialogs.loadDatabase();
dataUsers.loadDatabase();
dataMessages.loadDatabase();

export { dataDialogs, dataUsers,dataMessages };
