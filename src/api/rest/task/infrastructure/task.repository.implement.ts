import { TaskRepository } from './../domain/repository/task.repository';
import { TaskModelSchema } from './model/task.model.mongo';
import { TaskModel } from '../domain/model/task.model';

export class MongoTaskRepository extends TaskRepository {

  private convertToTaskModel(taskData: TaskModel): TaskModel {
    return {
      _id: taskData._id.toString(),
      title: taskData.title,
      completed: taskData.completed,
    };
  }

  async getAllTasks(query: any): Promise<TaskModel[]> {
    try {
      const { limit = 5, offset = 0 } = query
      const tasksData: TaskModel[] = await TaskModelSchema.find({})
        .limit(limit)
        .skip(offset)
        .exec();
      return tasksData
    } catch (error) {
      throw error;
    }
  }

   async getTaskById(taskId: string): Promise<TaskModel | null> {
    try {
      const taskData: TaskModel | null = await TaskModelSchema.findById(taskId).exec();
      return taskData ? this.convertToTaskModel(taskData) : null;
    } catch (error) {
      throw error;
    }
  }

  async createTask(params: { title: string, completed: boolean }): Promise<TaskModel> {
    try {
      const task = new TaskModelSchema({
        title: params.title,
        completed: params.completed,
      });
      const createdOk = await task.save();
      return createdOk  
    } catch (error) {
      throw error;
    }
  }

  async updateTask(task: TaskModel): Promise<TaskModel> {
    const updatedTask = await TaskModelSchema.findByIdAndUpdate(task._id, task, { new: true }).exec();
    if (updatedTask) {
      return this.convertToTaskModel(updatedTask);
    }
    throw new Error('No se pudo actualizar la tarea');
    }

   async removeTask(id: string): Promise<{ ok: string, error: boolean }> {
    try {
      const isOk = await TaskModelSchema.findByIdAndDelete(id).exec();
      if (isOk) {
        return {
          ok: 'true',
          error: false,
        };
      }
      return {
        ok: 'false',
        error: true,
      };
    } catch (error) {

      throw error;
    }
  }
    
}
