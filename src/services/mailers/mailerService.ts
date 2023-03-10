import { env } from "../../env/server.mjs";

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer/index.js";

export function sendMail(mailOptions: Mail.Options) {
  const transporter = nodemailer.createTransport({
    port: parseInt(env.MAIL_PORT),
    host: env.MAIL_SERVER,
    secure: env.MAIL_SECURE,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  });

  return transporter.sendMail(mailOptions, (error: unknown, info: unknown) => {
    if (error) {
      console.error(error);
    } else {
      console.info(info);
    }
  });
}
