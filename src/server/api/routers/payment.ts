import payment from "../../../schemas/payment";
import { createPayment } from "../../../services/paymentService";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const paymentRouter = createTRPCRouter({
  pay: protectedProcedure.input(payment).mutation(async ({ input, ctx }) => {
    const response = await createPayment(input, ctx);

    return response;
  }),
});
