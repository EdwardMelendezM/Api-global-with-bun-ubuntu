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
      .post("register", (ctx) => mongoUserRepository.register(ctx.body as UserModel, ctx.jwt as any), optionsRegister)
      // @ts-ignore
      .post("login", (ctx) => mongoUserRepository.login(ctx.body as UserModel, ctx.jwt as any), optionsLogin)
  )