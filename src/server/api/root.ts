import { createTRPCRouter } from "./trpc";
import { catFactsRouter } from "./routers/catFact";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  catFacts: catFactsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
