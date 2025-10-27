const express = require("express");
const router = express.Router();
const {
  createRide,
  acceptRide,
  completeRide,
} = require("../controllers/ride.controller");

// 🧍 Cliente solicita un viaje
router.post("/rides", createRide);

// 🚙 Conductor acepta el viaje
router.put("/rides/accept", acceptRide); // ✅ Nueva ruta

// ✅ Conductor completa el viaje
router.put("/rides/complete", completeRide);

module.exports = router;
