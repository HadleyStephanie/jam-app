import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.contact.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.number().nullable(),
        workPhone: z.number().nullable(),
        birthday: z.date().nullable(),
        lastConnectionDate: z.date().nullable(),
        connectionThreshold: z.number().nullable(),
        jobTitle: z.string().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contact.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          workPhone: input.workPhone,
          birthday: input.birthday,
          lastConnectionDate: input.lastConnectionDate,
          connectionThreshold: input.connectionThreshold,
          jobTitle: input.jobTitle,
          createdBy: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.bigint().nullable(),
        workPhone: z.bigint().nullable(),
        birthday: z.date().nullable(),
        lastConnectionDate: z.date().nullable(),
        connectionThreshold: z.number().nullable(),
        jobTitle: z.string().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contact.update({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          workPhone: input.workPhone,
          birthday: input.birthday,
          lastConnectionDate: input.lastConnectionDate,
          connectionThreshold: input.connectionThreshold,
          jobTitle: input.jobTitle,
        },
        where: {
          id: input.id,
        },
      });
    }),
});
