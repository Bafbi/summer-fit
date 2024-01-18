import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  //On récupère le rôle du user actuellement le role du user connecté
  getRole: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      select: {
        role: true,
      },
      where: {
        id: ctx.session.user.id,
      },
    });
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
});
