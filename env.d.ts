declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    NEXT_PUBLIC_BASE_URL?: string;
    STRIPE_PRICE_FRA_USA?: string;
    STRIPE_PRICE_FRA_CAN?: string;
    STRIPE_PRICE_FRA_GBR?: string;
    STRIPE_PRICE_FRA_DEU?: string;
    STRIPE_PRICE_FRA_ESP?: string;
    STRIPE_PRICE_FRA_ITA?: string;
    STRIPE_PRICE_FRA_PRT?: string;
    STRIPE_PRICE_FRA_CHE?: string;
    STRIPE_PRICE_FRA_BEL?: string;
    STRIPE_PRICE_FRA_AUS?: string;
  }
}
export {};
