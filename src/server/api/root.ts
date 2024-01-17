import { postRouter } from "~/server/api/routers/post";
import {hallsRouter} from "~/server/api/routers/halls";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { reservationRouter } from "./routers/reservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  halls: hallsRouter,
  user: userRouter,
  reservation: reservationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
