// Importamos las librerias necesarias
const bcrypt = require("bcrypt"); // Para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Para generar tokens JWT
const { PrismaClient } = require("@prisma/client"); // Para interactuar con la base de datos
const prisma = new PrismaClient();

// Clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET;

/*
* Registro de usuario o conductor
-- Si el rol es CLIENT, se crea en la tabla users
-- Si el rol es DRIVER, se crea en la tabla drivers
*/
exports.registerUser = async (req, res) => {
  const { cedula, name, phone, email, password, address, role } = req.body;

  try {
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registro de cliente
    if (role === "CLIENT") {
      const user = await prisma.user.create({
        data: {
          cedula,
          name,
          phone,
          email,
          password: hashedPassword,
          address,
          role: "CLIENT",
        },
      });
      return res.status(201).json({ message: "Cliente Registrado", user });
    }

    // Registro de conductor
    if (role === "DRIVER") {
      const driver = await prisma.driver.create({
        data: {
          cedula,
          name,
          phone,
          password: hashedPassword,
          licenseUrl: "",
          cedulaUrl: "",
          vehiclePhotoUrl: "",
          vehicleBrand: "",
          vehicleModel: "",
        },
      });
      return res.status(201).json({ message: "Conductor Registrado", driver });
    }

    // Si el rol no es valido
    return res.status(400).json({ message: "Rol Invalido" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
};

/*
* Login de usuario o conductor
-- Verifica la cedula y la contraseña
-- Genera un token JWT si las credenciales son correctas
*/

exports.login = async (req, res) => {
  const { cedula, password } = req.body;

  try {
    // Intentamos encontrar al cliente
    const user = await prisma.user.findUnique({ where: { cedula } });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign(
        { cedula: user.cedula, role: "CLIENT" },
        JWT_SECRET
      );

      return res.json({
        message: "Login exitoso",
        token,
        user: {
          cedula: user.cedula,
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address,
          role: "CLIENT",
        },
      });
    }

    // Si no es cliente, intentamos encontrar al conductor
    const driver = await prisma.driver.findUnique({ where: { cedula } });

    if (driver) {
      const match = await bcrypt.compare(password, driver.password);
      if (!match)
        return res.status(401).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign(
        { cedula: driver.cedula, role: "DRIVER" },
        JWT_SECRET
      );

      return res.json({
        message: "Login exitoso",
        token,
        driver: {
          cedula: driver.cedula,
          name: driver.name,
          phone: driver.phone,
          vehicleBrand: driver.vehicleBrand,
          vehicleModel: driver.vehicleModel,
          role: "DRIVER",
        },
      });
    }

    // Si no se encuentra en ninguna tabla
    return res.status(404).json({ error: "Usuario no encontrado" });
  } catch (err) {
    return res.status(500).json({
      error: "Error al iniciar sesión",
      details: err.message,
    });
  }
};
