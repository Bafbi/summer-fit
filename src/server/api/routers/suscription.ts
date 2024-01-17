// Importez les dépendances nécessaires
import { $Enums } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


const prisma = new PrismaClient()
// Définissez les plans d'abonnement avec des clés valides
const subscriptionPlans: { [key in 'BRONZE' | 'ARGENT' | 'OR' | 'DIAMANT']: number } = {
    BRONZE: 20,
    ARGENT: 50,
    OR: 100,
    DIAMANT: 200,
};

/*l'input devra etre de la forme
{
    plan : "bronze"
}*/
// Créez un schéma de validation pour le choix du plan d'abonnement
const subscriptionPlanSchema = z.enum(['BRONZE', 'ARGENT', 'OR', 'DIAMANT']);

// Durée de la simulation d'appel à une API de paiement (1 seconde)
const paymentSimulationDelay = 1000;

// Exportez le router tRPC pour la gestion des abonnements
export const subscriptionRouter = createTRPCRouter({
  // Procédure publique pour obtenir la liste des plans d'abonnement
  getSubscriptionPlans: publicProcedure.query(() => {
    return subscriptionPlans;
  }),

  // Procédure protégée pour l'achat d'un abonnement  
  purchaseSubscription: protectedProcedure 
    .input(z.object({ plan: subscriptionPlanSchema }))
    .mutation(async ({ ctx, input }) => {
      const selectedPlan = input.plan;
      const amount = subscriptionPlans[selectedPlan];
    console.log(amount); 
      

      // Intégrer un système de paiement réel ici (simulé par une pause)
      await new Promise((resolve) => setTimeout(resolve, paymentSimulationDelay));

      // Enregistrez l'achat dans la base de données
      const purchase = await ctx.db.user.update({
        where: {
            id: ctx.session.user.id
        },
        data: {
            abonnement: $Enums.Abonnement[selectedPlan]
        }
      });

      return { success: true, purchase };
    }),

  // Procédure protégée pour obtenir les abonnements de l'utilisateur actuel
  getUserSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user.abonnement;
  }),
});