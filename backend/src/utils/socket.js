const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // ajusta según tu frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Usuario conectado:", socket.id);

    // El conductor se une a la sala "conductores"
    socket.on("joinConductores", () => {
      socket.join("conductores");
      console.log("🚗 Conductor unido a sala conductores:", socket.id);
    });

    // El cliente se une a su sala personal (por cedula)
    socket.on("join", (cedula) => {
      socket.join(cedula);
      console.log("🧍 Cliente unido a sala:", cedula);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Usuario desconectado:", socket.id);
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io no ha sido inicializado");
  }
  return io;
}

module.exports = { initSocket, getIO };
