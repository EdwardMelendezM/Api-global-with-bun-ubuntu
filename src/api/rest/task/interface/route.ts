import Elysia from "elysia";
import { tagsTask } from "./swagger";
import { MongoTaskRepository } from "../infrastructure/task.repository.implement";
import { TaskModel } from "../domain/model/task.model";

const mongoTaskRepository = new MongoTaskRepository()

export const routeTask = new Elysia()
  .group('tasks', endpoint =>
  endpoint
    .get("/", () => mongoTaskRepository.getAllTasks(), tagsTask)
    .get("/:id", (ctx) => mongoTaskRepository.getTaskById(ctx.params.id as string), tagsTask)
    .post("/", (ctx) => mongoTaskRepository.createTask(ctx.body as TaskModel), tagsTask)
    .patch("/", (ctx) => mongoTaskRepository.updateTask(ctx.body as TaskModel), tagsTask)
    .delete("/:id", (ctx) => mongoTaskRepository.removeTask(ctx.params.id as string), tagsTask)
  )