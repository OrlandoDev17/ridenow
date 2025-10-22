const express = require("express");
const router = express.Router();
const userController = require("../controllers/profile.controller");

router.get("/me", userController.getProfile);
router.put("/me", userController.updateProfile);

module.exports = router;
