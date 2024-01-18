import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type $Enums from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Email from "next-auth/providers/email";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      role: $Enums.Role | null;
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      abonnement: $Enums.Abonnement | null;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    role: $Enums.Role | null;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    abonnement: $Enums.Abonnement | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        role: user.role,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        abonnement: user.abonnement,
      },
    }),

    async signIn({ user }) {
      const userExists = await db.user.findUnique({
        where: {
          email: user.email ?? undefined,
        },
      });

      if (userExists) {
        return true;   //if the email exists in the User collection, email them a magic login link
      } else {
        return "/register";
      }

     
    },
  },
  adapter: PrismaAdapter(db),

  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    Email({
      server: {
        service: "gmail",
        auth: {
          user: env.EMAIL_FROM,
          pass: env.EMAIL_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
