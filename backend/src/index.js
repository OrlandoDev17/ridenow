// Importamos las librerías necesarias
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno desde .env

// Inicializamos la app de Express
const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde otros dominios (útil para frontend)
app.use(express.json()); // Permite recibir datos en formato JSON

// Importamos las rutas de autenticación
const authRoutes = require("./routes/auth.routes");

// Usamos las rutas bajo el prefijo /api/auth
app.use("/api/auth", authRoutes);

// Usamos la carpeta uploads para servir archivos estáticos
app.use("/uploads", express.static("uploads"));

// Puerto de escucha (por defecto 3000 si no está definido en .env)
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT || 3001, () => {
  console.log(`✅ RideNow backend corriendo en puerto ${PORT}`);
});
