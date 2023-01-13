import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

type TCatFactData = {
  _id: string;
  text: string;
}

export const catFactsRouter = createTRPCRouter({
  getRandomCatFact: publicProcedure
    .query(async () => {
      const response = await fetch('https://cat-fact.herokuapp.com/facts/random?amount=1');
      const data: TCatFactData = await response.json();
      return {
        id: data._id,
        text: data.text
      };
    }),
  getAllCatFacts: publicProcedure.query(async ({ ctx }) => {
    const allCatFacts = await ctx.prisma.catFact.findMany({ orderBy: { likes: 'desc' } });
    return { data: allCatFacts };
  }),
  likeCatFact: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const upsertCatFact = await ctx.prisma.catFact.upsert({
        where: {
          id: input.id,
        },
        update: {
          likes: {
            increment: 1,
          }
        },
        create: {
          ...input,
          likes: 1,
          dislikes: 0
        }
      });
      return { data: upsertCatFact };
    }),
  dislikeCatFact: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const upsertCatFact = await ctx.prisma.catFact.upsert({
        where: {
          id: input.id,
        },
        update: {
          dislikes: {
            increment: 1,
          }
        },
        create: {
          ...input,
          likes: 0,
          dislikes: 1
        }
      });
      return { data: upsertCatFact };
    }),
});
