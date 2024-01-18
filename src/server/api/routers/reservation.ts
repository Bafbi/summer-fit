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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.reservation.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { date: "asc" },
      select: {
        id: true,
        date: true,
        salle: {
          select: { name: true, adresse: true, heure_ouverture: true, heure_fermeture: true },
        },
      },
    });
  }),

  validateOne: protectedProcedure.input(z.object({ reservationId: z.string().min(12), userId: z.string().min(12) })).mutation(async ({ ctx, input }) => {
    // On vérifie que l'utilisateur est bien un admin
    if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "COACH") {
      throw new Error(`Vous n'avez pas les droits pour effectuer cette action.`);
    }

    // On vérifie que la réservation existe
    const existingReservation = await ctx.db.reservation.findUnique({
      where: { id: input.reservationId, userId: input.userId },
    });

    if (!existingReservation) {
      throw new Error(`La réservation avec l'identifiant ${input.reservationId} n'existe pas.`);
    }

    return true;
  }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.reservation.findUnique({
      where: { id: input.id, userId: ctx.session.user.id },
      select: {
        id: true,
        date: true,
        salle: {
          select: { name: true, adresse: true, heure_ouverture: true, heure_fermeture: true },
        },
        user: {
          select: { id: true, email: true, name: true, role: true },
        },
      },
    });
  }),

});
