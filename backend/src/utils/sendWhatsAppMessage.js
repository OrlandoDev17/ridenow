const twilio = require("twilio");

const accountSid = "AC281ec04884c3b6266642a4107913b4ec";
const authToken = "094d759ba296cb9c2c680887fdd90143"; // reemplaza esto con tu token real
const client = twilio(accountSid, authToken);

function sendWhatsAppMessage({ to, body }) {
  return client.messages.create({
    from: "whatsapp:+14155238886", // número sandbox de Twilio
    to: `whatsapp:${to}`, // número destino
    body,
  });
}

module.exports = { sendWhatsAppMessage };
