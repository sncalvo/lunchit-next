import { createTRPCRouter } from "./trpc";
import { menusRouter } from "./routers/menus";
import { providersRouter } from "./routers/providers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  menus: menusRouter,
  providers: providersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
