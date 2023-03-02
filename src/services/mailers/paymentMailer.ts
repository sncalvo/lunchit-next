import { env } from "../../env/server.mjs";
import { sendMail } from "./mailerService";

export function sendPaymentMail(
  email: string,
  paymentId: string,
  paymentStatus: string,
  paymentStatusDetail: string
) {
  const mailOptions = {
    to: email,
    from: env.MAIL_USER,
    subject: "Tu pago ha sido procesado",
    html: `
      <h1>Tu pago ha sido procesado</h1>
      <p>El pago con ID ${paymentId} ha sido procesado con el estado ${paymentStatus} y el detalle ${paymentStatusDetail}</p>
    `,
  };

  return sendMail(mailOptions);
}
