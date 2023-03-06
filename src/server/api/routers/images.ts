import { z } from "zod";
import { createTRPCRouter, adminProviderProcedure } from "../trpc";

import S3 from "aws-sdk/clients/s3";

const schema = z.object({
  bucket: z.string(),
});

export const imageRouter = createTRPCRouter({
  createPresignedURL: adminProviderProcedure
    .input(schema)
    .mutation(async ({ ctx, input }) => {
      const { bucket } = input;
      const { companyId } = ctx.session.user;

      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const fields = {
        key: `companies/${companyId}/`,
      };

      const url = await s3.getSignedUrlPromise("putObject", {
        Bucket: bucket,
        Fields: fields,
        Expires: 60,
      });

      return { url, fields };
    }),
});
