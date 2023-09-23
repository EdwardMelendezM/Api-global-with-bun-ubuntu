import TaskDatabase, {Task,TaskCreate} from "./task.database";

export default class TaskService{
  db: TaskDatabase

  constructor(db: TaskDatabase){
    this.db=db
  }

  getBuns(){
    return this.db.getTasks()
  }
  getBun(id: string){
    return this.db.getTask(id)
  }
  createByb(type: TaskCreate){
    this.db.createTask(type)
  }
  updateBun(bun: Task){
    this.db.updateTask(bun)
  }
  daleteBun(id: string){
    this.db.deleteTask(id)
  }
} 