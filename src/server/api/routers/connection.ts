import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const connectionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.connection.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        contactId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.connection.create({
        data: {
          createdBy: ctx.session.user.id,
          contactId: input.contactId,
        },
      });
    }),
});
