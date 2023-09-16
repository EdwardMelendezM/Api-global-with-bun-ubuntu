import { Elysia } from "elysia";
import { MongoTaskRepository } from "./api/rest/task/infrastructure/task.repository.implement";

interface Task{
  id:string
  title:string
  completed:boolean
}

let tasks:Task[] = [
  {
    id:'1',
    title:'hacer la tarea',
    completed:false
  },
  {
    id:'2',
    title:'ver television',
    completed:false
  }
] 

const mongoTaskRepository = new MongoTaskRepository()

const app = new Elysia()
  .get("/", () => mongoTaskRepository.getAllTasks())
  .post("/", (ctx) => mongoTaskRepository.createTask(ctx.body as TaskModel))
  .delete("/:id", (ctx)=> mongoTaskRepository.removeTask(ctx.params.id as string))
  .get("/:id", (ctx) =>mongoTaskRepository.getTaskById(ctx.params.id as string) )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
