import Elysia, { t } from "elysia";
import { optionsLogin, optionsRegister } from "./swagger";
import { UserModel } from "../domain/user.model";
import { MongoUserRepository } from "../infrastructure/user.repository.implement";

const mongoUserRepository = new MongoUserRepository()

export const routeAuth = new Elysia()
  .group('auth', (app) =>
    app
      .post("register", (ctx) => mongoUserRepository.register(ctx.body as UserModel, ctx.jwt as any), optionsRegister)
      .post("login", (ctx) => mongoUserRepository.login(ctx.body as UserModel, ctx.jwt as any), optionsLogin)
  )