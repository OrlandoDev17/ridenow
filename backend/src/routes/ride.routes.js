const express = require("express");
const router = express.Router();
const { createRide } = require("../controllers/ride.controller");

// Ruta para que el cliente solicite un viaje
router.post("/rides", createRide);

module.exports = router;
