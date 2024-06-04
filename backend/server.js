const express = require("express");
const app = express();

const mongoDB = require("./db");

require("dotenv").config();

const port = process.env.PORT || 5000;  // Keeping some default port, if there is no port number on env file

mongoDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
