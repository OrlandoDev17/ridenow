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

  try {
    // Validación básica
    if (!cedula || !name || !phone || !password || !role) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar si ya existe
    const existingUser = await prisma.user.findUnique({ where: { cedula } });
    if (existingUser) {
      return res.status(409).json({ message: "La cédula ya está registrada" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        cedula,
        name,
        phone,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    return res
      .status(500)
      .json({ message: "Error interno al registrar usuario" });
  }
};

/*
 * Login de usuario
 * Verifica la cédula y la contraseña
 * Genera un token JWT si las credenciales son correctas
 */
exports.login = async (req, res) => {
  const { cedula, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { cedula } });

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
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        cedula: user.cedula,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({
      error: "Error interno al iniciar sesión",
      details: error.message,
    });
  }
};
