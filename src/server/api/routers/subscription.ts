import { $Enums } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const subscriptionPlanSchema = z.enum(["BRONZE", "ARGENT", "OR", "DIAMANT"]);

export const subscriptionRouter = createTRPCRouter({
  purchaseSubscription: protectedProcedure
    .input(z.object({ plan: subscriptionPlanSchema }))
    .mutation(async ({ ctx, input }) => {
      // Intégrer un système de paiement réel ici (simulé par une pause)
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Enregistrez l'achat dans la base de données
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          abonnement: $Enums.Abonnement[input.plan],
        },
      });
    }),
});
