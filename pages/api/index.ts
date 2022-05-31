const app = require("express")();
const server = require("http").Server(app);
// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;

const users = require("./routes/users");
const dialogs = require("./routes/dialogs");

app.use(users);
app.use(dialogs);

export { app };

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
