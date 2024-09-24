const express = require("express");
const {
  userLogin,
  userSignup,
  getUser,
} = require("../controllers/authController");
const checkAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/user", checkAuth, getUser);

module.exports = router;
