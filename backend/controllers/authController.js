const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
  let errors = {
    email: "",
    password: "",
  };
  if (err?.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createWebToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: maxAge,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (user) {
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      const token = createWebToken(user._id);
      res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res
        .status(201)
        .json({ token, user: { email: user.email, timeZone: user.timeZone } });
    } else {
      return res
        .status(400)
        .json({ error_message: "The password is incorrect" });
    }
  } else {
    return res.status(400).json({ error_message: "The email does not exist." });
  }
};

const userSignup = async (req, res) => {
  const { email, password, timezone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error_message: "Duplicate Email. User already exists" });
    }
    user = await User.create({
      email,
      password,
      timezone,
    });
    const token = createWebToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(201)
      .json({ token, user: { email: user.email, timeZone: user.timeZone } });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = { userLogin, userSignup };
