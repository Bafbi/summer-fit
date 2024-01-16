import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getRole: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      select: {
        role: true,
      },
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
