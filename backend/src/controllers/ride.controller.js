const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendWhatsAppMessage } = require("../utils/sendWhatsAppMessage");
const { getIO } = require("../utils/socket");

const travelOptions = {
  ONE_WAY: "Solo Ida",
  ROUND_TRIP: "Ida y Vuelta",
};

const paymentMethods = {
  CASH: "Efectivo",
  PAGO_MOVIL: "Pago Móvil",
  CREDITS: "Créditos",
};

exports.createRide = async (req, res) => {
  const io = getIO();

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

  // 🔐 Validacion Básica
  if (
    !origin ||
    !destination ||
    !clientCedula ||
    !paymentMethod ||
    !travelOption
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // Buscar cliente
    const client = await prisma.user.findUnique({
      where: { cedula: clientCedula },
      select: {
        cedula: true,
        name: true,
        phone: true,
        address: true,
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Construir datos de viaje
    const rideData = {
      origin,
      destination,
      clientCedula,
      paymentMethod,
      travelOption,
      scheduled,
      scheduledAt: scheduled ? new Date(scheduledAt) : null,
      status: "PENDING",
    };

    if (originLat !== undefined) rideData.originLat = originLat;
    if (originLng !== undefined) rideData.originLng = originLng;
    if (destinationLat !== undefined) rideData.destinationLat = destinationLat;
    if (destinationLng !== undefined) rideData.destinationLng = destinationLng;

    // Crear viaje
    const ride = await prisma.ride.create({
      data: rideData,
    });

    // Notificar por WhatsApp
    const mensaje = `
      🚗 Nuevo viaje disponible
      🟢 Origen: ${origin}
      🎯 Destino: ${destination}
      🧍 Cliente: ${client.name}
      📞 Teléfono: ${client.phone}
      💳 Pago: ${paymentMethods[paymentMethod]}
      📅 Tipo: ${travelOptions[travelOption]}
    `;

    await sendWhatsAppMessage({ to: "+584242860846", body: mensaje });

    // Emitir por WebSocket a conductores
    io.to("conductores").emit("nuevoViaje", {
      id: ride.id,
      origin,
      destination,
      travelOption,
      paymentMethod,
      scheduled,
      scheduledAt,
      cliente: {
        cedula: client.cedula,
        name: client.name,
        phone: client.phone,
        address: client.address,
      },
    });

    // Respuesta completa
    return res.status(201).json({
      message: "Viaje creado y notificado exitosamente",
      ride: {
        id: ride.id,
        status: ride.status,
        origin: ride.origin,
        destination: ride.destination,
        travelOption: ride.travelOption,
        paymentMethod: ride.paymentMethod,
        scheduled: ride.scheduled,
        scheduledAt: ride.scheduledAt,
        cliente: {
          cedula: client.cedula,
          name: client.name,
          phone: client.phone,
          address: client.address,
        },
        conductor: null, // aun no se asigna
      },
    });
  } catch (error) {
    console.error("❌ Error al crear el viaje:", error);
    return res.status(500).json({ error: "Error interno al crear el viaje" });
  }
};

exports.acceptRide = async (req, res) => {
  const io = getIO();
  const { rideId, driverCedula, fare } = req.body;

  // 🔐 Validación básica
  if (!rideId || !driverCedula || fare === undefined) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // Buscar Viaje
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride || ride.status !== "PENDING") {
      return res
        .status(400)
        .json({ error: "El viaje no está disponible para asignar" });
    }

    // Buscar conductor
    const driver = await prisma.user.findFirst({
      where: { cedula: driverCedula, role: "DRIVER" },
      select: {
        cedula: true,
        name: true,
        phone: true,
        vehicleBrand: true,
        vehicleModel: true,
        vehiclePhotoUrl: true,
      },
    });

    if (!driver) {
      return res.status(404).json({ error: "Conductor no encontrado" });
    }

    // Actualizar Viaje
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverCedula,
        fare,
        assignedAt: new Date(),
        status: "ASSIGNED",
        confirmationSent: true,
      },
    });

    // 🔍 Buscar cliente
    const client = await prisma.user.findUnique({
      where: { cedula: ride.clientCedula },
      select: {
        cedula: true,
        name: true,
        phone: true,
        address: true,
      },
    });

    // 📡 Emitir evento al cliente
    io.to(ride.clientCedula).emit("viajeAsignado", {
      rideId,
      conductor: driver,
      fare,
    });

    // ✅ Respuesta completa
    return res.status(200).json({
      message: "Viaje asignado exitosamente",
      ride: updatedRide,
      conductor: driver,
      cliente: client,
    });
  } catch (error) {
    console.error("❌ Error al asignar viaje:", error);
    return res.status(500).json({ error: "Error interno al asignar viaje" });
  }
};

exports.completeRide = async (req, res) => {
  const io = getIO();
  const { rideId, driverCedula } = req.body;

  // 🔐 Validación básica
  if (!rideId || !driverCedula) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // Buscar Viaje
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    if (ride.status !== "ASSIGNED") {
      return res.status(400).json({ error: "El viaje no está en curso" });
    }

    if (ride.driverCedula !== driverCedula) {
      return res
        .status(403)
        .json({ error: "Solo el conductor asignado puede completar el viaje" });
    }

    // Marcar como completado
    const completedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    // Emitir el evento al cliente
    io.to(ride.clientCedula).emit("viajeCompletado", {
      rideId,
      message: "Tu viaje ha finalizado. ¡Gracias por usar RideNow!",
    });

    return res.status(200).json({
      message: "Viaje completado exitosamente",
      ride: completedRide,
    });
  } catch (error) {
    console.error("❌ Error al completar viaje:", error);
    return res.status(500).json({ error: "Error interno al completar viaje" });
  }
};

exports.getPendingRides = async (req, res) => {
  try {
    const rides = await prisma.ride.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "desc" },
      include: {
        client: {
          select: {
            cedula: true,
            name: true,
            phone: true,
            address: true,
            photoUrl: true,
            rides: {
              where: { status: "COMPLETED" },
              select: { id: true },
            },
          },
        },
      },
    });

    const formatted = rides.map((ride) => ({
      id: ride.id,
      origin: ride.origin,
      destination: ride.destination,
      originLat: ride.originLat,
      originLng: ride.originLng,
      destinationLat: ride.destinationLat,
      destinationLng: ride.destinationLng,
      travelOption: ride.travelOption,
      paymentMethod: ride.paymentMethod,
      scheduled: ride.scheduled,
      scheduledAt: ride.scheduledAt,
      requestedAt: ride.requestedAt,
      note: ride.note,
      fare: ride.fare,
      cliente: {
        cedula: ride.client.cedula,
        name: ride.client.name,
        phone: ride.client.phone,
        address: ride.client.address,
        photoUrl: ride.client.photoUrl,
        totalRides: ride.client.rides.length,
      },
    }));

    return res.status(200).json({ rides: formatted });
  } catch (error) {
    console.error("❌ Error al obtener viajes pendientes:", error);
    return res.status(500).json({ error: "Error interno al obtener viajes" });
  }
};
