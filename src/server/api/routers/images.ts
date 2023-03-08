import { createTRPCRouter, protectedProcedure } from "../trpc";

import S3 from "aws-sdk/clients/s3";
import * as z from "zod";

import * as uuid from "uuid";

const schema = z.object({
  key: z.string(),
});

export const imageRouter = createTRPCRouter({
  createPresignedURL: protectedProcedure
    .input(schema)
    .mutation(async ({ input }) => {
      console.log("input", input);
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT,
      });

      const UUID = uuid.v4();
      const fields = {
        Key: `${input.key}/${UUID}`,
      };
      console.log("fields", fields);

      // const url = await s3.getSignedUrlPromise("putObject", {
      //   Bucket: process.env.NODE_ENV,
      //   Key: fields.key,
      //   Expires: 60,
      // });
      const url = await new Promise<string>((resolve, reject) =>
        s3.createPresignedPost(
          {
            Bucket: process.env.NODE_ENV,
            Fields: fields,
            Expires: 60,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data.url);
            }
          }
        )
      );

      console.log("url", url);

      return { url, fields: { key: fields.Key } };
    }),
});
