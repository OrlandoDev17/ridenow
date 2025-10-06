// Importamos Prisma para interactuar con la base de datos
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * Solicitud de viaje por parte del cliente
 * Permite definir origen y destino como texto o coordenadas
 * Requiere: tipo de viaje, si es agendado y fecha opcional
 * El cliente se identifica por el token (cedula)
 */

exports.createRide = async (req, res) => {
  const {
    origin,
    originLat,
    originLng,
    destination,
    destinationLat,
    destinationLng,
    type,
    scheduled,
    scheduledAt,
  } = req.bodyl;

  const cedula = req.user.cedula;

  try {
    // Validacion Básica
    if (!type || scheduled === undefined) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Validar Origen
    if (!origin && (originLat === undefined || originLng === undefined)) {
      return res.status(400).json({ message: "Debes definir el origen" });
    }

    // Validar Destino
    if (
      !destination &&
      (destinationLat === undefined || destinationLng === undefined)
    ) {
      return res.status(400).json({ message: "Debes definir el destino" });
    }

    // Validar Fecha (si es agendado)
    if (scheduled && !scheduledAt) {
      return res
        .status(400)
        .json({ message: "Debes indicar la fecha agendada" });
    }

    // Crear el Viaje
    const ride = await prisma.ride.create({
      data: {
        origin: origin || "Ubicación Compartida",
        originLat: originLat ?? null,
        originLng: originLng ?? null,
        destination: destination || "Destino marcado en el mapa",
        destinationLat: destinationLat ?? null,
        destinationLng: destinationLng ?? null,
        type,
        scheduled,
        scheduledAt: scheduled ? new Date(scheduledAt) : null,
        clientCedula: cedula,
        status: "PENDING",
      },
    });

    return res
      .status(201)
      .json({ message: "Viaje solicitado exitosamente", ride });
  } catch (error) {
    console.error("❌ Error al crear viaje:", error);
    return res
      .status(500)
      .json({ message: "Error interno al solicitar viaje" });
  }
};
