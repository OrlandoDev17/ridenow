const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAdminData = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    const rides = await prisma.ride.findMany({
      include: {
        client: {
          select: {
            cedula: true,
            name: true,
            phone: true,
          },
        },
        driver: {
          select: {
            cedula: true,
            name: true,
          },
        },
      },
      orderBy: { requestedAt: "desc" },
    });

    res.status(200).json({ users, rides });
  } catch (error) {
    console.error("❌ Error al obtener datos de admin:", error);
    res.status(500).json({ error: "Error al obtener datos de administrador" });
  }
};
