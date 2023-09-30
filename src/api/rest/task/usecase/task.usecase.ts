import { TaskRepository } from '../domain/repository/task.repository';
import { TaskTypeResponse } from '../d.type';



export class TaskUseCaseImplementado {
  constructor(
    private taskRepository: TaskRepository
  ){}

  async getAllTasks(ctx: any): Promise<TaskTypeResponse> {
    return this.taskRepository.getAllTasks(ctx.query);
  }

  async getTaskById(ctx: any): Promise<TaskTypeResponse> {
    return this.taskRepository.getTaskById(ctx.params.id);
  }

  async createTask(ctx: any): Promise<TaskTypeResponse> {
    // if (!ctx.user) {
    //   ctx.set.status = 401;
    //   return {
    //     data: null,
    //     error: true,
    //     res: "Don't has token authorization"
    //   };
    // }
    return this.taskRepository.createTask(ctx.body);
  }

  async updateTask(ctx: any): Promise<TaskTypeResponse> {
    // if (!ctx.user) {
    //   ctx.set.status = 401;
    //   return {
    //     data: null,
    //     error: true,
    //     res: "Don't has token authorization"
    //   };
    // }
    return this.taskRepository.updateTask(ctx.body);
  }

  async removeTask(ctx: any): Promise<TaskTypeResponse> {
    // if (!ctx.user) {
    //   ctx.set.status = 401;
    //   return {
    //     data: null,
    //     error: true,
    //     res: "Don't has token authorization"
    //   };
    // }
    return this.taskRepository.removeTask(ctx.params.id);
  }
}


