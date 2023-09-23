import TaskDatabase, {Task, TaskCreate} from "./task.database";
import TaskService from "./connectSqLite";

const db = new TaskDatabase()
const bunService = new  TaskService(db)

export default {
  port:5000,
  async fetch(request: Request){
    const { method, url } = request
    const { pathname, searchParams } = new URL(url)
    console.log(`${method} ${pathname}`);

    if(method === 'GET' && pathname === "/buns"){
      const buns = bunService.getBuns()
      return new Response(JSON.stringify(buns))
    }

    if (method === 'POST' && pathname === "/buns") {
      const data: TaskCreate  = await request.json()
      bunService.createByb(data)
      return new Response(JSON.stringify({
        success:'success'
      }))
    }

    if (method === 'PUT' && pathname === "/buns") {
      const data: Task = await request.json()
      bunService.updateBun(data)
      return new Response(JSON.stringify({
        success: 'updated succesfully'
      }))
    }
    if (method === 'DELETE' && pathname === "/buns") {
      const data: Task = await request.json()
      bunService.daleteBun(data.id)
      return new Response(JSON.stringify({
        success: 'delete succesfully'
      }))
    }

    return new Response("Not found", { status:400})
  }
}
