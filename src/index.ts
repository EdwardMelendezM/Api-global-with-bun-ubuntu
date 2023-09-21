import { Elysia } from "elysia";
import { MongoTaskRepository } from "./api/rest/task/infrastructure/task.repository.implement";
import { TaskModel } from "./api/rest/task/domain/model/task.model";

import { swagger } from '@elysiajs/swagger'

const mongoTaskRepository = new MongoTaskRepository()

const app = new Elysia()
  .use(swagger({
    documentation: {
      tags: [
        { name: 'App', description: 'General endpoints' },
        { name: 'Auth', description: 'Authentication endpoints' }
      ],
      info:{
        title:'Elysia documentation',
        version:'1.0.0'
      }
    }
  }))
  .group('task', (app) =>
    app
    .get("/", () => mongoTaskRepository.getAllTasks(),
          { detail: {tags:['Task']} })
    .get("/:id", (ctx) => mongoTaskRepository.getTaskById(ctx.params.id as string),
          { detail: { tags: ['Task'] } })
    .post("/", (ctx) => mongoTaskRepository.createTask(ctx.body as TaskModel))
    .patch("/", (ctx) => mongoTaskRepository.updateTask(ctx.body as TaskModel))
    .delete("/:id", (ctx) => mongoTaskRepository.removeTask(ctx.params.id as string))
    ,
    
  ).listen(3000);
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

