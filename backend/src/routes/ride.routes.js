const express = require("express");
const router = express.Router();
const { createRide } = require("../controllers/ride.controller");
const { verifyToken } = require("../middlewares/verifyToken");

// Ruta para que el cliente solicite un viaje
router.post("/rides", verifyToken, createRide);

module.exports = router;
