const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");

const SECRET = "bearer"; // This should be in the dotenv file, rn I am keeping it here.

loginRouter.post("/", async (request, response) => {
  try {
    const { emailOrPhone, password } = request.body;

    var user = await User.findOne({ email: emailOrPhone });
    if (user == null) {
      user = await User.findOne({ phoneNumber: emailOrPhone });
    }

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "Invalid email or password",
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response
      .status(200)
      .send({ token, email: user.email, name: user.name, id: user._id });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = loginRouter;
