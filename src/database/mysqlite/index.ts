import TaskDatabase, {Task, TaskCreate} from "./task.database";
import TaskService from "./task.service";

const db = new TaskDatabase()
const taskService = new  TaskService(db)

export default {
  port:5000,
  async fetch(request: Request){
    const { method, url } = request
    const { pathname, searchParams } = new URL(url)
    console.log(`${method} ${pathname}`);

    if(method === 'GET' && pathname === "/task"){
      const buns = taskService.getBuns()
      return new Response(JSON.stringify(buns))
    }

    if (method === 'POST' && pathname === "/task") {
      const data: TaskCreate  = await request.json()
      taskService.createByb(data)
      return new Response(JSON.stringify({
        success:'success'
      }))
    }

    if (method === 'PUT' && pathname === "/task") {
      const data: Task = await request.json()
      taskService.updateBun(data)
      return new Response(JSON.stringify({
        success: 'updated succesfully'
      }))
    }
    if (method === 'DELETE' && pathname === "/task") {
      const data: Task = await request.json()
      taskService.daleteBun(data.id)
      return new Response(JSON.stringify({
        success: 'delete succesfully'
      }))
    }

    return new Response("Not found", { status:400})
  }
}
