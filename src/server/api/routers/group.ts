import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        contactId: z.string().array(),
        groupTitle: z.string(),
        lastConnectionDate: z.date().nullable(),
        connectionThreshold: z.number().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.group.create({
        data: {
          groupTitle: input.groupTitle,
          lastConnectionDate: input.lastConnectionDate,
          connectionThreshold: input.connectionThreshold,
          contactId: input.contactId,
          createdBy: ctx.session.user.id,
        },
      });
    }),
});
