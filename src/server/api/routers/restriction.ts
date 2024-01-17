// Importez les dépendances nécessaires
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const prisma = new PrismaClient();

// Définir personnes qui ont accès aux sites
const acces: { [key in 'CLIENT' | 'ADMINISTRATEUR' ]: string } = {
    CLIENT: 'client',
    ADMINISTRATEUR: 'admin',
};

// Créez un schéma de validation entre les personnes qui ont accès aux sites
const accesPlans = z.enum(['CLIENT', 'ADMINISTRATEUR']);

// Exportez le router tRPC pour la gestion des accès aux sites
export const accesRouter = createTRPCRouter({
  // Procédure publique pour obtenir la liste des plans d'abonnement
  getAccesPlans: publicProcedure.query(() => {
    return accesPlans;
  }),

  // Restriction de l'accès administrateur aux clients
  restrictionAcces: protectedProcedure
    .query(({ ctx }) => {
      // Votre logique de restriction d'accès ici
      if (ctx.session.user.role === acces.ADMINISTRATEUR) {
        // Accès autorisé
        return "Accès autorisé pour les administrateurs";
      } else {
        // Accès non autorisé
        throw new Error("Accès interdit. Vous n'avez pas les privilèges d'administrateur.");
      }
    }),
});
