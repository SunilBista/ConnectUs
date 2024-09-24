const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretKey = process.env.JWT_SECRET;

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error_message: "No token, authorization denied" });
  }
  try {
    const decodedInfo = jwt.verify(token, secretKey);
    console.log("decode", decodedInfo);
    console.log("decodedInfo", decodedInfo);
    req.user = decodedInfo.id;
    next();
  } catch (err) {
    res.status(401).json({ error_message: "Token is not valid" });
  }
};

module.exports = checkAuth;
