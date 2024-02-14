// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "dayjs-nuxt",
    "@pinia/nuxt",
    "@productdevbook/chatwoot",
  ],
  app: {
    head: {
      title: "OpenformStack",
      meta: [
        {
          name: "description",
          content:
            "Open source form backend that allows you to collect form submissions without writing any backend code",
        },
        { charset: "utf-8" },
      ],
    },
  },
  runtimeConfig: {
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    PRO_MONTHLY_PRICE_ID: process.env.PRO_MONTHLY_PRICE_ID,
    PRO_YEARLY_PRICE_ID: process.env.PRO_YEARLY_PRICE_ID,
    BYESPAM_API_KEY: process.env.BYESPAM_API_KEY,
    public: {
      FROM_MAIL: process.env.FROM_MAIL,
      BASE_URL: process.env.BASE_URL,
      // SEO
      siteUrl: process.env.BASE_URL || "https://openformstack.com",
      siteName: "OpenformStack",
      siteDescription:
        "Open source form backend that allows you to collect form submissions without writing any backend code",
      language: "en",
    },
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  colorMode: {
    preference: "light",
  },
  chatwoot: {
    init: {
      websiteToken: process.env.CHATWOOT_WEBSITE_TOKEN,
    },
    settings: {
      locale: "en",
      position: "left",
      launcherTitle: "Chat",
    },
  },
});
