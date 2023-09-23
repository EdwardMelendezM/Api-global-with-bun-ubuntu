import Elysia from "elysia";
import bearer from "@elysiajs/bearer";

export const isAuthenticated = (app: Elysia) =>
  app
    .use(bearer())
    // @ts-ignore
    .derive(async ({ bearer, jwt, set }) => {
      if (bearer === undefined) {
        set.status = 401;
        return {
          user: null
        };
      }
      const { existUser } = await jwt.verify(bearer);
      if (!existUser) {
      set.status = 401;
        return {
          user: null
        };
      }
      return {
        user: existUser
      };
  });