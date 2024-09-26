const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responseService = require("../service/responseService");

const secretKey = process.env.JWT_SECRET;
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
  try {
    const user = await User.findOne({ email });
    if (user) {
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        const token = createWebToken(user._id);
        //change httpOnly to true later
        res.cookie("token", token, { maxAge: maxAge * 1000 });
        return res.status(200).json(
          responseService.success(
            "Login successful",
            {
              token,
              user: {
                email: user.email,
                timezone: user.timezone,
                username: user.username,
              },
            },
            responseService.statusCodes.ok
          )
        );
      } else {
        return res
          .status(400)
          .json(responseService.error("The password is incorrect"));
      }
    } else {
      return res
        .status(400)
        .json(responseService.error("The email does not exist"));
    }
  } catch (err) {
    res
      .status(500)
      .json(responseService.internalServerError("Server error", err));
  }
};

const userSignup = async (req, res) => {
  const { username, email, password, timezone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json(
          responseService.conflictError("Duplicate Email. User already exists")
        );
    }
    user = await User.create({
      username,
      email,
      password,
      timezone,
    });
    const token = createWebToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(
      responseService.success(
        "User created successfully",
        {
          token,
          user: {
            email: user.email,
            timezone: user.timezone,
            username: user.username,
          },
        },
        responseService.statusCodes.created
      )
    );
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(responseService.error("Signup failed", errors));
  }
};

const userLogout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    return res
      .status(200)
      .json(
        responseService.success(
          "Logout successful",
          null,
          responseService.statusCodes.ok
        )
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        responseService.internalServerError("Server error during logout", err)
      );
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(404)
        .json(responseService.notFoundError("User not found"));
    }
    const { password, ...userData } = user._doc;
    res
      .status(200)
      .json(responseService.success("User data retrieved", userData));
  } catch (err) {
    res
      .status(500)
      .json(responseService.internalServerError("Server error", err));
  }
};

module.exports = { userLogin, userSignup, getUser, userLogout };
