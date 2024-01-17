import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/*
model Reservation {
    id        String   @id @default(auto()) @map("_id") @db.ObjectId
    date      DateTime
    salleId     String   @db.ObjectId
    salle       Salle    @relation(fields: [salleId], references: [id])
    userId       String   @db.ObjectId @unique
    user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
*/

export const reservationRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(z.object({ datetime: z.date(), salleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reservation.create({
        data: {
          date: input.datetime,
          salle: { connect: { id: input.salleId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reservation.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.reservation.findUnique({
        where: { userId: ctx.session.user.id, id: input.id },
        select: { salle: {
          select: { name: true, adresse: true, capacite: true}
        }}
      });
    }),
});
