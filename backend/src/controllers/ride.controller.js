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
  console.log("📦 req.body:", req.body);
  console.log("🧪 Campos individuales:");
  console.log("origin:", req.body.origin);
  console.log("destination:", req.body.destination);
  console.log("clientCedula:", req.body.clientCedula);
  console.log("paymentMethod:", req.body.paymentMethod);
  console.log("travelOption:", req.body.travelOption);

  const {
    origin,
    originLat,
    originLng,
    destination,
    destinationLat,
    destinationLng,
    clientCedula,
    paymentMethod,
    travelOption,
    scheduled,
    scheduledAt,
  } = req.body;

  if (
    typeof origin !== "string" ||
    origin.trim() === "" ||
    typeof destination !== "string" ||
    destination.trim() === "" ||
    typeof clientCedula !== "string" ||
    clientCedula.trim() === "" ||
    typeof paymentMethod !== "string" ||
    typeof travelOption !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios o están mal formateados" });
  }

  try {
    const ride = await prisma.ride.create({
      data: {
        origin,
        originLat,
        originLng,
        destination,
        destinationLat,
        destinationLng,
        clientCedula,
        paymentMethod,
        travelOption,
        scheduled,
        scheduledAt: scheduled ? new Date(scheduledAt) : null,
        status: "PENDING",
      },
    });

    return res.status(201).json(ride);
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    return res.status(500).json({ error: "Error al crear el viaje" });
  }
};
