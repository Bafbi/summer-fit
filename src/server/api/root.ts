import { postRouter } from "~/server/api/routers/post";
import {hallsRouter} from "~/server/api/routers/halls";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { reservationRouter } from "./routers/reservation";
import { subscriptionRouter } from "./routers/subscription";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  halls: hallsRouter,
  utilisateur: userRouter,
  reservation: reservationRouter,
  abonnement: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
