import Elysia from "elysia";
import { tagsTask } from "./swagger";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { taskUseCase } from "../usecase/task.usecase";


export const routeTask = new Elysia()
  
  .group('task', route =>
    route
      .get("/", (ctx) => taskUseCase.getAllTasks(ctx), tagsTask)
      .get("/:id", (ctx) => taskUseCase.getTaskById(ctx), tagsTask)
      
      .use(isAuthenticated)
      .post("/", (ctx) => taskUseCase.createTask(ctx), tagsTask)
      .patch("/", (ctx) => taskUseCase.updateTask(ctx), tagsTask)
      .delete("/:id", (ctx) => taskUseCase.removeTask(ctx), tagsTask)
  )