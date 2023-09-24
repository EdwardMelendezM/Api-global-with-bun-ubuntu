import Elysia, { t } from "elysia";
import { optionsLogin, optionsRegister } from "./swagger";
import { UserModel } from "../domain/user.model";
import { MongoUserRepository } from "../infrastructure/user.repository.implement";
import { jwtAuth } from "../../../../utils/jwt";

const mongoUserRepository = new MongoUserRepository()

export const routeAuth = new Elysia()
  .use(jwtAuth)
  .group('auth', (app) =>
    app
      // @ts-ignore
      .post("register", async (ctx) => {
        const { error, token } = await mongoUserRepository.register(ctx.body as UserModel, ctx.jwt as any)
        if( error === true ){
          ctx.set.status = 404
        }
        return {
          error,
          token
        }
      }, optionsRegister)
      // @ts-ignore
      .post("login", async (ctx) => {
        const { error, token } = await mongoUserRepository.login(ctx.body as UserModel, ctx.jwt as any)
        if (error === true) {
          ctx.set.status = 404
        }
        return {
          error,
          token
        }
      }, optionsLogin)
  )