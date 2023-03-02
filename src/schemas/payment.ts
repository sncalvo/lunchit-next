import * as z from "zod";

const paymentSchema = z.object({
  transaction_amount: z.number(),
  token: z.string(),
  installments: z.number(),
  payment_method_id: z.string(),
  issuer_id: z.string(),
  payer: z.object({
    email: z.string(),
  }),
  menuVariantId: z.string(),
});

export default paymentSchema;
