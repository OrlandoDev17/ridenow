const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

/*
 * GET /api/user/me
 * Obtiene el perfil completo del usuario autenticado
 */
exports.getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { cedula: decoded.cedula },
      select: {
        cedula: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        role: true,
        photoUrl: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ user });
  } catch (err) {
    console.error("❌ Error al obtener perfil:", err);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

/*
 * PUT /api/user/me
 * Actualiza los datos del perfil del usuario autenticado
 */
exports.updateProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const cedula = decoded.cedula;

    const updatedUser = await prisma.user.update({
      where: { cedula },
      data: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        photoUrl: req.body.photoUrl,
      },
      select: {
        cedula: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        role: true,
        photoUrl: true,
        createdAt: true,
      },
    });

    res.json({ message: "Perfil actualizado", user: updatedUser });
  } catch (err) {
    console.error("❌ Error al actualizar perfil:", err);
    res
      .status(500)
      .json({ error: "Error al actualizar perfil", details: err.message });
  }
};
