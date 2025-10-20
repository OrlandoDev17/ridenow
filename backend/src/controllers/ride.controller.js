const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendWhatsAppMessage } = require("../utils/sendWhatsAppMessage"); // asegúrate de importar correctamente

exports.createRide = async (req, res) => {
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

  // 🔐 Validación básica
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
    // 🧭 Crear viaje
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

    // 📲 Notificar por WhatsApp
    const mensaje = `🚗 Nuevo viaje disponible
🟢 Origen: ${origin}
🎯 Destino: ${destination}
🧍 Cliente: ${clientCedula}
💰 Pago: ${paymentMethod}
📅 Tipo: ${travelOption}`;

    await sendWhatsAppMessage({ to: "+584242860846", body: mensaje });

    return res.status(201).json({
      message: "Viaje creado y notificado exitosamente",
      rideId: ride.id,
      status: ride.status,
    });
  } catch (error) {
    console.error("❌ Error al crear el viaje:", error);
    return res.status(500).json({ error: "Error interno al crear el viaje" });
  }
};
