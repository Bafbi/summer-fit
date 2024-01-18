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
// Définir les plans d'abonnement avec des clés valides
const subscriptionPlans: { [key in 'BRONZE' | 'ARGENT' | 'OR' | 'DIAMANT']: number } = {
    BRONZE: 0,
    ARGENT: 20,
    OR: 30,
    DIAMANT: 50,
};

/*l'input devra etre de la forme
{
    plan : "bronze"
}*/


// Création un schéma de validation pour le choix du plan d'abonnement
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



  //Fonction trouvant un client abonné en fonction en de son id
  getOneById : publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
          where: {id: input.userId}
      });
      return user;
  }),


  // Procédure protégée pour la mise à jour des informations du forfait
  updateSubscriptionPlanInfo: protectedProcedure
  .input(
    z.object({
      plan: subscriptionPlanSchema,
      newPrice: z.number(), // Nouveau prix du forfait
    })
    )
    .mutation(async ({ ctx, input }) => {
      const { plan, newPrice } = input;
      // Vérifiez les autorisations de l'administrateur
      if (ctx.session.user.role === "ADMIN") {
        // Mettez à jour le prix du forfait dans la liste des plans d'abonnement
        subscriptionPlans[plan] = newPrice;
        // Vous pouvez également mettre à jour ces informations dans une base de données ou un fichier de configuration si nécessaire
        return { success: true, message: `Les informations du forfait ${plan} ont été mises à jour.` };
      } else {
        throw new Error("Vous n'avez pas les autorisations nécessaires pour mettre à jour les informations du forfait.");
      }
    }),




  // Fonction permettant de modifier un abonnement
  updateOneByID: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(1),
        abonnement: z.enum(['BRONZE', 'ARGENT', 'OR', 'DIAMANT']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role === "USER") {
        // Assurez-vous que l'abonnement est une valeur valide
        const abonnement = input.abonnement;

        // Mise à jour des informations de l'utilisateur
        const userModifie = await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            name: input.name,
            abonnement: abonnement,
          },
        });
        return userModifie;
      } else {
        throw new Error("Vous n'avez pas les permissions nécessaires pour mettre à jour un abonnement.");
      }
    }),
}); 

  