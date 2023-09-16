import { TaskRepository } from '../domain/repository/task.repository';
import { TaskModel } from '../domain/model/task.model'

export class TaskUseCase {
  constructor(private taskRepository: TaskRepository) { }

  async getAllTasks(): Promise<TaskModel[]> {
    return this.taskRepository.getAllTasks();
  }

  async getTaskById(taskId: string): Promise<TaskModel | null> {
    return this.taskRepository.getTaskById(taskId);
  }

  async createTask(params: { title: string; completed: boolean }): Promise<TaskModel> {
    return this.taskRepository.createTask(params);
  }

  async updateTask(task: TaskModel): Promise<TaskModel> {
    return this.taskRepository.updateTask(task);
  }

  async removeTask(id: string): Promise<{ ok: string; error: boolean }> {
    return this.taskRepository.removeTask(id);
  }
}
