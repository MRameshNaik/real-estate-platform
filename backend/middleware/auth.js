const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const authorizeAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      throw new Error();
    }
    next();
  } catch (e) {
    res.status(403).send({ error: "Access denied." });
  }
};

module.exports = { authenticate, authorizeAdmin };
