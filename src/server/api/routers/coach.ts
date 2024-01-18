import { $Enums } from "@prisma/client";
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

export const coachRouter = createTRPCRouter({
     // Fonction permettant de recupérer l'ensemble des coachs
    getAll : publicProcedure
    .query(async ({ ctx }) => {
        const coach = await ctx.db.coach.findMany();
        return coach;
    }),

    // Fonction permettant de trouver un coach en fonction de son id
    getOneById : publicProcedure
    .input(z.object({ coachId: z.string() }))
    .query(async ({ ctx, input }) => {
        const coach = await ctx.db.coach.findUnique({
            where: {id: input.coachId}
        });

        return coach;
    }),

     //Fonction permettant de supprimer un coach
     deleteOneById : protectedProcedure
     .input(z.object({ coachId : z.string() }))
     .mutation(async ({ ctx, input }) => {
       if(ctx.session.user.role === "ADMIN"){
          //On vérifie d'abord que le coach existe
          const existingCoach = await ctx.db.coach.findUnique({
           where: { id: input.coachId }
       });
         if(!existingCoach){
           throw new Error(`La coach avec l'identifiant ${input.coachId} n'existe pas.`);
         }
         
       //On peut maintenant la supprimer si elle existe 
       const deletedCoach = await ctx.db.coach.delete({
           where: { id: input.coachId }
       });
       return deletedCoach;
     };  
   }),

   //Fonction permettant d'ajouter un nouveau coach
   createOne : protectedProcedure
   .input( z.object({
       name: z.string().min(1),
       num_tel: z.string(),
   }))
   .mutation(async ({ ctx, input }) => {
     if(ctx.session.user.role === "ADMIN"){
       // Créez la salle
       const nouvelleCoach = await ctx.db.coach.create({
         data: {
           name: input.name,
           num_tel: input.num_tel,
           user: { connect: { id: ctx.session.user.id } },
         },
     });
     return nouvelleCoach;
       };
   }),     

   
    //Fonction permettant de modifier les informations d'un coach
    updateOneByID: protectedProcedure
    .input(
    z.object({
        coachId: z.string(),
        name: z.string().min(1),
        num_tel: z.string(),
    })
       )
    .mutation(async ({ ctx, input }) => {
    if(ctx.session.user.role === "ADMIN" || ctx.session.user.role === "COACH"){
    const coachModifiee = await ctx.db.coach.update({
        where: { id: input.coachId },
            data: {
                name: input.name,
                num_tel: input.num_tel,
                user: { connect: { id: ctx.session.user.id } },
             },
           });
             return coachModifiee;
             };
           }),
  // Fonction permettant de déplacer un coach dans une salle
    moveCoachToHall: protectedProcedure
    .input(z.object({ coachId: z.string(), salleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role === "ADMIN") {
        // Vérifiez d'abord que le coach existe
        const existingCoach = await ctx.db.coach.findUnique({
          where: { id: input.coachId },
        });
        if (!existingCoach) {
          throw new Error(`Le coach avec l'identifiant ${input.coachId} n'existe pas.`);
        }
        // Vérifiez ensuite que la salle existe
        const existingHall = await ctx.db.salle.findUnique({
          where: { id: input.salleId },
        });
        if (!existingHall) {
          throw new Error(`La salle avec l'identifiant ${input.salleId} n'existe pas.`);
        }
        // Déplacez le coach vers la nouvelle salle 
        const movedCoach = await ctx.db.coach.update({
          where: { id: input.coachId },
          data: {
            salle: { connect: { id: input.salleId } },
          },
        });
        return movedCoach;
      } else {
        throw new Error("Vous n'avez pas les permissions nécessaires pour déplacer un coach dans une salle.");
      }
    }),
  });
