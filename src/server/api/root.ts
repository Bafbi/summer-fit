import { postRouter } from "~/server/api/routers/post";
import { subscriptionRouter } from "./routers/suscription";
import { coachRouter } from "./routers/coach";
import { hallsRouter } from "~/server/api/routers/halls";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { reservationRouter } from "./routers/reservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  suscription: subscriptionRouter,
  post: postRouter,
  halls: hallsRouter,
  user: userRouter,
  reservation: reservationRouter,
  coach: coachRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
