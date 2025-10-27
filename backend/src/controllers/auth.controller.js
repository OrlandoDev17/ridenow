// Importamos las librerías necesarias
const bcrypt = require("bcrypt"); // Para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Para generar tokens JWT
const { PrismaClient } = require("@prisma/client"); // Para interactuar con la base de datos
const prisma = new PrismaClient();

// Clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET;

/*
 * Registro de usuario (cliente o conductor)
 * Guarda solo los campos básicos
 */

exports.registerUser = async (req, res) => {
  const { cedula, name, phone, password, role } = req.body;

  const allowedRoles = ["CLIENT", "DRIVER", "ADMIN"];
  const userRole = allowedRoles.includes(role) ? role : "CLIENT"; // por defecto CLIENT

  const existing = await prisma.user.findUnique({ where: { cedula } });
  if (existing) {
    return res
      .status(400)
      .json({ error: "Ya existe un usuario con esa cédula" });
  }

  // 🔐 Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      cedula,
      name,
      phone,
      password: hashedPassword,
      role: userRole,
    },
  });

  const token = jwt.sign(
    { cedula: newUser.cedula, role: newUser.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(201).json({
    token,
    user: {
      cedula: newUser.cedula,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  });
};

/*
 * Login de usuario
 * Verifica la cédula y la contraseña
 * Genera un token JWT si las credenciales son correctas
 */
exports.login = async (req, res) => {
  const { cedula, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { cedula },
    select: {
      cedula: true,
      name: true,
      phone: true,
      password: true,
      email: true,
      address: true,
      role: true,
      photoUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  try {
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { cedula: user.cedula, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: hashedPassword, ...safeUser } = user;

    return res.json({
      message: "Login exitoso",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({
      error: "Error interno al iniciar sesión",
      details: error.message,
    });
  }
};
