// Importamos Express y creamos el router
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

// Importamos los controladores de autenticación
const { registerUser, login } = require("../controllers/auth.controller");

// Ruta para registrar cliente o conductor
// POST /api/auth/register
router.post("/register", registerUser);

router.post(
  "/auth/register",
  upload.fields([
    { name: "faceUrl", maxCount: 1 },
    { name: "cedulaUrl", maxCount: 1 },
    { name: "licenseUrl", maxCount: 1 },
    { name: "vehiclePhotoUrl", maxCount: 1 },
  ]),
  registerUser
);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post("/login", login);

// Exportamos el router para usarlo en index.js
module.exports = router;
