import mercadopago from "mercadopago";
import type * as z from "zod";
import { serverEnv } from "../env/schema.mjs";

import type paymentSchema from "../schemas/payment";

type PaymentResponse = {
  status: string;
  status_detail: string;
  id: string;
  date_approved: string;
  payment_method_id: string;
  payment_type_id: string;
  payer: {
    email: string;
  };
};

export async function createPayment(
  paymentData: z.infer<typeof paymentSchema>
) {
  if (!serverEnv.MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined");
  }

  mercadopago.configurations.setAccessToken(
    serverEnv.MERCADO_PAGO_ACCESS_TOKEN
  );

  const response = await mercadopago.payment.save(paymentData);

  const {
    status,
    status_detail: statusDetail,
    id,
  } = response.body as PaymentResponse;

  return { status, statusDetail, id };
}
