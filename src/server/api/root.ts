import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { catFactsRouter } from "./routers/catFact";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  catFacts: catFactsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
