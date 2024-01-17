import { error } from "console";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

//Besoin de mettre à jour les publics/privates

export const hallsRouter = createTRPCRouter({
    //Fonction récupérant l'ensemble des salles de sport disponibles
    getAll : publicProcedure
    .query(async ({ ctx }) => {
        const salles = await ctx.db.salle.findMany();

        return salles;
    }),

    //Fonction trouvant une salle de sport en fonction de son id
    getOneById : publicProcedure
    .input(z.object({ salleId: z.string() }))
    .query(async ({ ctx, input }) => {
        const salle = await ctx.db.salle.findUnique({
            where: {id: input.salleId}
        });

        return salle;
    }),

    //Fonction permettant de supprimer une salle de sport
    deleteOneById : protectedProcedure
    .input(z.object({ salleId : z.string() }))
    .mutation(async ({ ctx, input }) => {
        //On vérifie d'abord que la salle existe
        const existingHalls = await ctx.db.salle.findUnique({
            where: { id: input.salleId }
        });

        if(!existingHalls){
            throw new Error(`La salle avec l'identifiant ${input.salleId} n'existe pas.`);
        }

        //On peut maintenant la supprimer si elle existe 
        const deletedSalle = await ctx.db.salle.delete({
            where: { id: input.salleId }
        });

        return deletedSalle;
    }),




    //Fonction permettant d'ajouter une nouvelle salle
    createOne : protectedProcedure
    .input( z.object({
        name: z.string().min(1),
        adresse: z.string(),
        capacite: z.number(),
        nbr_coach: z.number(),
        num_tel: z.string(),
        heure_ouverture: z.array(z.number()),
        heure_fermeture: z.array(z.number()),
        latitude: z.number(),
        longitude: z.number(),
        machines: z.array(z.object({ name: z.string(), nbr_machine: z.number() })),
        images: z.array(z.object({ name: z.string(), url: z.string() })) 
    }))
    .mutation(async ({ ctx, input }) => {
        // Créez la salle
        const nouvelleSalle = await ctx.db.salle.create({
          data: {
            name: input.name,
            adresse: input.adresse,
            capacite: input.capacite,
            nbr_coach: input.nbr_coach,
            num_tel: input.num_tel,
            heure_ouverture: input.heure_ouverture,
            heure_fermeture: input.heure_fermeture,
            latitude: input.latitude,
            longitude: input.longitude,
            machine: {
              create: input.machines
            },
            images: {
              create: input.images
            }
          },
        });
    
        return nouvelleSalle;
    }),     




    //Fonction permettant de modifier les informations d'une salle
    updateOneByID: protectedProcedure
    .input(
        z.object({
            salleId: z.string(),
            name: z.string().min(1),
            adresse: z.string(),
            capacite: z.number(),
            nbr_coach: z.number(),
            num_tel: z.string(),
            heure_ouverture: z.array(z.number()),
            heure_fermeture: z.array(z.number()),
            latitude: z.number(),
            longitude : z.number(),
            machines: z.array(z.object({ name: z.string(), nbr_machine: z.number() })),
            images: z.array(z.object({ name: z.string(), url: z.string() })) 
        })
    )
    .mutation(async ({ ctx, input }) => {
        const salleModifiee = await ctx.db.salle.update({
        where: { id: input.salleId },
        data: {
            name: input.name,
            adresse: input.adresse,
            capacite: input.capacite,
            nbr_coach: input.nbr_coach,
            num_tel: input.num_tel,
            heure_ouverture: input.heure_ouverture,
            heure_fermeture: input.heure_fermeture,
            latitude: input.latitude,
            longitude: input.longitude,
            machine: {
              create: input.machines
            },
            images: {
              create: input.images
            }
        },
        });
        return salleModifiee;
    }),

    
});
