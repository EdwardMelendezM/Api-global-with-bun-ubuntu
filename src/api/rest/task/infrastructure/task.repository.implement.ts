import { TaskRepository } from './../domain/repository/task.repository';
import { TaskModelSchema } from './model/task.model.mongo';
import { TaskModel } from '../domain/model/task.model';
import { TaskTypeResponse } from '../d.type';
import { TaskEntity } from '../domain/model/task.entity';

export class MongoTaskRepository extends TaskRepository {

  async getAllTasks(query: any): Promise<TaskTypeResponse> {
    try {
      const { limit = 5, offset = 0 } = query
      const tasksData: TaskEntity[] = await TaskModelSchema.find({})
        .limit(limit)
        .skip(offset)
        .exec();
      return {
        data: tasksData,
        error: false,
        res: null
      }
    } catch (error) {
      return {
        data: null,
        error: false,
        res: `${error}`
      }
    }
  }

  async getTaskById(taskId: string): Promise<TaskTypeResponse> {
    try {
      const taskData: TaskEntity | null = await TaskModelSchema.findById(taskId).exec();
      return {
        data: taskData,
        error: false,
        res: null
      }
    } catch (error) {
      return {
        data: null,
        error: true,
        res: `${error}`
      }
    }
  }

  async createTask(params: { title: string, completed: boolean }): Promise<TaskTypeResponse> {
    try {
      const task = new TaskModelSchema({
        title: params.title,
        completed: params.completed,
      });
      const createdOk = await task.save();
      return {
        data: createdOk,
        error: false,
        res: null
      } 
    } catch (error) {
      return {
        data: null,
        error: true,
        res: `${error}`
      } 
    }
  }

  async updateTask(task: TaskModel): Promise<TaskTypeResponse> {
    try {
      console.log(task);
      
      const updatedTask = await TaskModelSchema.findByIdAndUpdate(task.id, task, { new: true }).exec();
      return {
        data: updatedTask,
        error: false,
        res: null
      } 
    } catch (error) {
      return {
        data: null,
        error: true,
        res: `${error}`
      }
    }
  }

  async removeTask(id: string): Promise<TaskTypeResponse> {
    try {
      const isOk = await TaskModelSchema.findByIdAndDelete(id).exec();
      return {
        data: isOk,
        error: false,
        res: null
      }
    } catch (error) {
      return {
        data: null,
        error: true,
        res: `${error}`
      }
    }
  }
    
}
