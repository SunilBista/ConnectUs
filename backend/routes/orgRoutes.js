const express = require("express");
const { getOrganizationData } = require("../controllers/orgController");
const checkAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/organization/:id", checkAuth, getOrganizationData);

module.exports = router;
