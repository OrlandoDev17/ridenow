// Importamos las librerías necesarias
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno desde .env

// Importamos las rutas
const authRoutes = require("./routes/auth.routes");
const rideRoutes = require("./routes/ride.routes");
const adminRoutes = require("./routes/adminData.routes");
const profileRoutes = require("./routes/profile.routes");

// Inicializamos la app de Express
const app = express();

// Middlewares globales
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ridenow-psi.vercel.app",
      "capacitor://localhost",
      "http://localhost",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // Permite peticiones desde otros dominios (útil para frontend)
app.use(express.json()); // Permite recibir datos en formato JSON

// Usar Rutas
app.use("/api/auth", authRoutes);
app.use("/api", rideRoutes);
app.use("/api", adminRoutes);
app.use("/api/user", profileRoutes);

// Usamos la carpeta uploads para servir archivos estáticos
app.use("/uploads", express.static("uploads"));

// Puerto de escucha (por defecto 3000 si no está definido en .env)
const PORT = process.env.PORT || 3001;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`✅ RideNow backend corriendo en puerto ${PORT}`);
});
