// Importez les dépendances nécessaires
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


// Définissez les plans d'abonnement avec des clés valides
const subscriptionPlans: { [key in 'bronze' | 'Argent' | 'Or' | 'Diamant']: number } = {
    bronze: 20,
    Argent: 50,
    Or: 100,
    Diamant: 200,
};

// Créez un schéma de validation pour le choix du plan d'abonnement
const subscriptionPlanSchema = z.enum(['bronze', 'Argent', 'Or', 'Diamant']);

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
      

      // Intégrer un système de paiement réel ici (simulé par une pause)
      await new Promise((resolve) => setTimeout(resolve, paymentSimulationDelay));

      // Enregistrez l'achat dans la base de données
      const purchase = await ctx.db.subscription.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          plan: selectedPlan,
          amount,
        },
      });

      return { success: true, purchase };
    }),

  // Procédure protégée pour obtenir les abonnements de l'utilisateur actuel
  getUserSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const userSubscriptions = await ctx.db.subscription.findMany({
      where: { user: { id: ctx.session.user.id } },
    });

    return userSubscriptions;
  }),
});
