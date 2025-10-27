// socket.js
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
    console.log("🟢 Nuevo socket conectado:", socket.id);

    // Ejemplo: unir a grupo de conductores
    socket.on("joinConductores", () => {
      socket.join("conductores");
      console.log(`Socket ${socket.id} unido al grupo conductores`);
    });

    // Puedes agregar más listeners aquí
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO no ha sido inicializado");
  }
  return io;
}

module.exports = { initSocket, getIO };
