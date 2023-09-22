import Elysia from "elysia";
import { tagsAuth } from "./swagger";
import { MongoUserRepository } from "../infrastructure/user.repository.implement";
import { UserModel } from "../domain/user.model";

const mongoUserRepository = new MongoUserRepository()

export const routeAuth = new Elysia()
  .group('auth', (app) =>
    app
      .post("register", (ctx) => mongoUserRepository.register(ctx.body as UserModel), tagsAuth)
      .post("login", (ctx) => mongoUserRepository.login(ctx.body as UserModel), tagsAuth)
  )