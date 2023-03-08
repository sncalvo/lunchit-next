import { createTRPCRouter } from "./trpc";
import { menusRouter } from "./routers/menus";
import { providersRouter } from "./routers/providers";
import { categoriesRouter } from "./routers/categories";
import { menuVariantsRouter } from "./routers/menuVariants";
import { paymentRouter } from "./routers/payment";
import { imageRouter } from "./routers/images";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  menus: menusRouter,
  providers: providersRouter,
  categories: categoriesRouter,
  menuVariants: menuVariantsRouter,
  payments: paymentRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
