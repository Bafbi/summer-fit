import { input } from "@nextui-org/react";
import { $Enums } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  //On récupère le rôle du user actuellement le role du user connecté
  setRole: protectedProcedure.input(z.object({ userId: z.string(), role: z.enum(["USER", "COACH", "ADMIN"])})).mutation(async ({ ctx, input }) => {

    if (ctx.session.user.role !== "ADMIN") {
      throw new Error(`Vous n'avez pas les droits pour effectuer cette action.`);
    }    

    console.log(input.role);
    

    return ctx.db.user.update({
      where: {
        id: input.userId,
      },
      data: {
        role: $Enums.Role[input.role],
      },
    })
  }),


  //On retourne tout les users
  getAllUser: protectedProcedure
  .query(async ({ctx}) =>{
    const users = await ctx.db.user.findMany();

    return users;
  }),


  //On récupère un user par son id
  getOneUserById: protectedProcedure
  .input( z.object({userId : z.string()}))
  .query(async({ctx, input}) => {
    const user = await ctx.db.user.findUnique({
      where : {id: input.userId}
    });
    
    return user
  }),

  setName: protectedProcedure
  .input(z.object({name: z.string() }))
  .mutation(async ({ctx, input}) => {
    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        name: input.name,
      },
    })
  }),
});
