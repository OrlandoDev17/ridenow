const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function sendWhatsAppMessage({ to, body }) {
  return client.messages.create({
    from: "whatsapp:+14155238886", // número sandbox de Twilio
    to: `whatsapp:${to}`, // número destino
    body,
  });
}

module.exports = { sendWhatsAppMessage };
