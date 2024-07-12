const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const AdminRouter = require("./controllers/adminlogin");
const adminsignuprouter = require("./controllers/adminsignup");
const propertyRouter = require("./controllers/propertyRoutes");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the property router
app.use("/api", propertyRouter);

const mongoDB = require("./db");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 5000; // Keeping some default port, if there is no port number on env file

mongoDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/admin/login", AdminRouter);
app.use("/api/admin/signup", adminsignuprouter);
app.use("/api", require("./controllers/propertyRoutes"));
app.use("/api", require("./controllers/propertyImageRoutes"));
app.use("/api/testimonials", require("./controllers/testimonialRoutes"));
app.use("/api", require("./controllers/emailVerification"));
app.use("/api", require("./controllers/Appointment"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
