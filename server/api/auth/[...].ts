import { NuxtAuthHandler } from "#auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const runtimeConfig = useRuntimeConfig();
const prisma = new PrismaClient();

/* NOTE AUTH ENV FILES LOADED FROM .env into nuxt.config.ts */

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: useRuntimeConfig().API_ROUTE_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    // @ts-expect-error
    AzureADProvider.default({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      /*responseType: 'code',
      responseMode: 'query', */
      authorization: {
        params: {
          scope: `offline_access openid profile email`,
        },
      },
    }),
  /*
  GoogleProvider.default({
    //  clientId: useRuntimeConfig().public.GOOGLE_CLIENT_ID,
    //  clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
    //}),
  */  
  ],
  callbacks: {
    /*
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    */
    async session({ session, token }) {
      if (session) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account?.expires_at
            ? account.expires_at * 1000
            : 0,
        token.refreshToken = account.refresh_token;
      }

      return token;
      
      /*
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
      */
      
    },
    /*
    //jwt({ token, account, user }) {
    //  if (account) {
    //    token.accessToken = account.access_token;
    //    token.id = user?.id;
    //  }
    //  return token;
    //},
    */
  },
  events: {
    createUser: async (message) => {
      await prisma.workspace.create({
        data: {
          name: "My workspace",
          users: {
            connect: {
              id: message.user.id,
            },
          },
        },
      });
    },
  },
});
