const express = require("express");
const {
  userLogin,
  userSignup,
  getUser,
  userLogout,
} = require("../controllers/authController");
const checkAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/user", checkAuth, getUser);
router.get("/logout", userLogout);

module.exports = router;
