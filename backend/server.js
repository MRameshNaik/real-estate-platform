const express = require("express");
const app = express();
const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const mongoDB = require("./db");

require("dotenv").config();

const port = process.env.PORT || 5000; // Keeping some default port, if there is no port number on env file

mongoDB();
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
