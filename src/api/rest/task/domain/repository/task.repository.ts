export abstract class TaskRepository{
  abstract getAllTasks(): Array<TaskModel>
  abstract getTaskById(taskId: string): TaskModel
  abstract createTask(params:{title:string, completed:boolean}): TaskModel
  abstract updateTask(task:TaskModel): TaskModel
  abstract removeTask(id: string): {ok:string, error:boolean}

}