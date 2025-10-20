const express = require("express");
const router = express.Router();
const { getAdminData } = require("../controllers/adminData.controller");

// Ruta GET para obtener usuarios y viajes
router.get("/admin", getAdminData);

module.exports = router;
