const express = require("express");
const router = express.Router();
const {
  createRide,
  acceptRide,
  completeRide,
  getPendingRides,
} = require("../controllers/ride.controller");

// 🧍 Cliente solicita un viaje
router.post("/rides", createRide);

// 🚙 Conductor acepta el viaje
router.put("/rides/accept", acceptRide);

// ✅ Conductor completa el viaje
router.put("/rides/complete", completeRide);

// ✅ Conductor completa el viaje
router.get("/rides/pending", getPendingRides);

module.exports = router;
