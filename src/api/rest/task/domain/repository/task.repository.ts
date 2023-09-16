export abstract class TaskRepository {
  abstract getAllTasks(): Promise<TaskModel[]>;
  abstract getTaskById(taskId: string): Promise<TaskModel | null>;
  abstract createTask(params: { title: string; completed: boolean }): Promise<TaskModel>;
  abstract updateTask(task: TaskModel): Promise<TaskModel>;
  abstract removeTask(id: string): Promise<{ ok: string; error: boolean }>;
}
