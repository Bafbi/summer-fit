import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


// Définir les personnes qui auront accès aux sites
const role: { [key in 'CLIENT' | 'ADMINISTRATEUR' | 'COACH']: String } = {
  CLIENT: 'USER',
  ADMINISTRATEUR: 'ADMIN',
  COACH: 'COACH'
};


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
   // Opération de création d'une réservation
  createOne: protectedProcedure
    .input(z.object({ datetime: z.date(), salleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
    // Logique pour créer une réservation dans la base de données
      return ctx.db.reservation.create({
        data: {
          date: input.datetime,
          salle: { connect: { id: input.salleId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  
   

  deleteOne: protectedProcedure
  // Opération de suppression d'une réservation
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        // Logique pour supprimer une réservation dans la base de données
        return ctx.db.reservation.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
    }),
    // Opération de récupération de toutes les réservations d'un utilisateur
    getAll: protectedProcedure.query(async ({ ctx }) => {
      // Logique pour récupérer toutes les réservations d'un utilisateur depuis la base de données
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
  });
