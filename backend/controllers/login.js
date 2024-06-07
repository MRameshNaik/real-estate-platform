const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");
const { response } = require("express");

const SECRET = "bearer"; // This should be in the dotenv file , rn i m keeping it here .

loginRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
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

    response.status(200).json({
      token,
      email: user.email,
      name: user.name,
      id: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = loginRouter;
