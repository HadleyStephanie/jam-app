// import { z } from "zod";
// import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// export const contactRouter = createTRPCRouter({
//   getAll: protectedProcedure.query(({ ctx, input }) => {
//     return ctx.prisma.contact.findMany({
//       where: {
//         userId: ctx.session.user.id,
//       },
//     });
//   }),

//   create: protectedProcedure.input(z.object({})).mutation(),
// });
