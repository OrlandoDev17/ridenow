const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // ✅ extrae el token del header

  try {
    console.log("🔐 Token recibido:", req.headers.authorization);
    const decoded = jwt.verify(token, JWT_SECRET); // ✅ verifica el token recibido
    req.user = decoded; // ✅ agrega los datos decodificados al request
    next();
  } catch (err) {
    console.error("❌ Error al verificar token:", err.message);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
