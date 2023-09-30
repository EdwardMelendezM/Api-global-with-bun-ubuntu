import Elysia from "elysia";
import { tagsTask } from "./swagger";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { TaskUseCaseImplementado } from "../usecase/task.usecase";
import { MongoTaskRepository } from "../infrastructure/task.repository.implement";

const mongoTaskRepository = new MongoTaskRepository()
const taskUseCase = new TaskUseCaseImplementado(mongoTaskRepository)

export const routeTask = new Elysia()
  .group('task', route =>
    route
      // .use(isAuthenticated)
      .get("/", (ctx) => taskUseCase.getAllTasks(ctx), tagsTask)
      .get("/:id", (ctx) => taskUseCase.getTaskById(ctx), tagsTask)
      .post("/", (ctx) => {
        console.log(ctx.body);
        return taskUseCase.createTask(ctx)
      }, tagsTask)
      .patch("/", (ctx) => {
        console.log(ctx.body);
        return taskUseCase.updateTask(ctx)
      }, tagsTask)
      .delete("/:id", (ctx) => taskUseCase.removeTask(ctx), tagsTask)
  )