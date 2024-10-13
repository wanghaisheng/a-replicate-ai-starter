// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // app base url
      NEXT_PUBLIC_APP_BASE_URL: string;

      // unsplash api access key
      NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: string;

      // replicate api token
      REPLICATE_API_TOKEN: string;
    }
  }
}
