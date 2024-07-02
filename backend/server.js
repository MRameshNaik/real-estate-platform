const express = require("express");
const app = express();
const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const mongoDB = require("./db");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 5000; // Keeping some default port, if there is no port number on env file

mongoDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api", require("./controllers/propertyRoutes"));
app.use("/api", require("./controllers/propertyImageRoutes"));
app.use("/api/testimonials", require("./controllers/testimonialRoutes"));
app.use("/api", require("./controllers/emailVerification"));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
