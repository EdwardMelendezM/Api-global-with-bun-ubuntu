import { Elysia } from "elysia";

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

const app = new Elysia()
                  .get("/", () => new Response(
                    JSON.stringify(tasks)
                  ))
                  .post("/", ({body}) => {
                    const {title, completed} = body as {title:string, completed:boolean}
                    const newTask:Task = {
                      id:crypto.randomUUID(),
                      title,
                      completed
                    }
                    tasks.push(newTask)
                    new Response(
                    JSON.stringify(newTask)
                  )
                  })
                  .delete("/:id", ({params,set}) => {
                    const id = params.id
                    const tempTask = tasks.filter(task=>task.id!==id)
                    if(!tempTask){
                      set.status=404
                      new Response( JSON.stringify({
                        message:'Something went wrong while deleting',
                        error:true
                      }))
                    }
                    tasks = [...tempTask]
                    
                    new Response(
                    JSON.stringify({
                      remove:'ok',
                      error:false
                    })
                  )
                  })
                  .get("/:id", ({body,set, params}) => {
                    const id = params.id
                    const task = tasks.find(task => task.id === id)
                    if(!task) {
                      set.status = 404
                      return new Response(JSON.stringify({
                      message:'Not found task',
                      error:true
                    }))
                    }
                    return new Response(JSON.stringify(task))
                  })
                  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
