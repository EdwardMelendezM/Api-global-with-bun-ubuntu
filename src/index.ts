import { Elysia } from "elysia";
import { MongoTaskRepository } from "./api/rest/task/infrastructure/task.repository.implement";
import { TaskModel } from "./api/rest/task/domain/model/task.model";

import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'
import { MongoUserRepository } from "./api/rest/user/infrastructure/user.repository.implement";
import { UserModel } from "./api/rest/user/domain/user.model";

const mongoTaskRepository = new MongoTaskRepository()
const mongoUserRepository = new MongoUserRepository()

const tagsTask = { detail: { tags: ['Task'] } }
const tagsUser= { detail: { tags: ['Auth'] } }

const app = new Elysia()
  .use(
    jwt ({
      name:'jwt',
      secret:process.env.SECRET_JWT_SS!
    })
  )
  .use(swagger({
    documentation: {
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Task', description: 'Tasks endpoints' }
      ],
      info:{
        title:'Elysia documentation',
        version:'1.0.0'
      }
    }
  }))
  .group('task', (app) =>
    app
      .get("/", () => mongoTaskRepository.getAllTasks(), tagsTask)
      .get("/:id", (ctx) => mongoTaskRepository.getTaskById(ctx.params.id as string), tagsTask)
      .post("/", (ctx) => mongoTaskRepository.createTask(ctx.body as TaskModel), tagsTask)
      .patch("/", (ctx) => mongoTaskRepository.updateTask(ctx.body as TaskModel), tagsTask)
      .delete("/:id", (ctx) => mongoTaskRepository.removeTask(ctx.params.id as string), tagsTask)
    ,
    
  )
  .group('auth',(app)=>
    app
      .post("register", (ctx) => mongoUserRepository.register(ctx.body as UserModel), tagsUser)
      .post("login", (ctx) => mongoUserRepository.login(ctx.body as UserModel), tagsUser)
  )
  .listen(3000);
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

