import mercadopago from "mercadopago";
import type * as z from "zod";
import { serverEnv } from "../env/schema.mjs";

import type { TRPCContext } from "../server/api/trpc";

import type paymentSchema from "../schemas/payment";
import { sendPaymentMail } from "./mailers/paymentMailer";

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

type PaymentResult = {
  status: "approved" | "in_process" | "rejected";
  statusDetail: string;
  id: string;
};

export async function createPayment(
  paymentData: z.infer<typeof paymentSchema>,
  ctx: TRPCContext
) {
  if (!serverEnv.MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined");
  }

  if (!ctx?.session?.user) {
    throw new Error("User is not logged in");
  }

  const menuVariantId = paymentData.menuVariantId;

  const payment = { ...paymentData, menuVariantId: undefined };

  delete payment.menuVariantId;

  const order = await ctx.prisma.order.create({
    data: {
      menuVariant: {
        connect: {
          id: menuVariantId,
        },
      },
      user: {
        connect: {
          id: ctx.session.user.id,
        },
      },
    },
  });

  mercadopago.configurations.setAccessToken(
    serverEnv.MERCADO_PAGO_ACCESS_TOKEN
  );

  const response = await mercadopago.payment.save(payment);

  const {
    status,
    status_detail: statusDetail,
    id,
  } = response.body as PaymentResponse;

  await ctx.prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      orderId: `${id}`,
      status: status !== "approved" ? "CANCELLED" : "CONFIRMED",
    },
  });

  sendPaymentMail(paymentData.payer.email, id, status, statusDetail);

  return { status, statusDetail, id } as PaymentResult;
}
