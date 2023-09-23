import { TaskTypeResponse } from "../../d.type";
import { TaskModel } from "../model/task.model";

export abstract class TaskRepository {
  abstract getAllTasks(query: any): Promise<TaskTypeResponse>;
  abstract getTaskById(taskId: string): Promise<TaskTypeResponse>;
  abstract createTask(params: { title: string; completed: boolean }): Promise<TaskTypeResponse>;
  abstract updateTask(task: TaskModel): Promise<TaskTypeResponse>;
  abstract removeTask(id: string): Promise<TaskTypeResponse>;
}
