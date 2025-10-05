// Importamos la librería JWT para verificar tokens
const jwt = require("jsonwebtoken");

// Obtenemos la clave secreta desde las variables de entorno (.env)
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware de autenticación
 * - Verifica si el token JWT está presente y es válido
 * - Si es válido, agrega los datos del usuario al objeto `req.user`
 * - Si no hay token o es inválido, responde con error
 */
module.exports = (req, res, next) => {
  // Extraemos el token del encabezado Authorization: Bearer <token>
  const token = req.headers.authorization?.split(" ")[1];

  // Si no hay token, bloqueamos el acceso
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET);

    // Guardamos los datos del usuario en la petición para usarlos en rutas protegidas
    req.user = decoded;

    // Continuamos con la siguiente función
    next();
  } catch {
    // Si el token es inválido o expiró
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};
