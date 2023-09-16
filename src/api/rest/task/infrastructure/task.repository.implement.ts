// infrastructure/task.repository.impl.ts
import { TaskRepository } from './../domain/repository/task.repository';
import { TaskModel } from './model/task.model.mongo';

export class MongoTaskRepository extends TaskRepository {

  private convertToTaskModel(taskData: TaskModel): TaskModel {
    return {
      _id: taskData._id.toString(), // Convertir ObjectId a cadena
      title: taskData.title,
      completed: taskData.completed,
    };
  }

  async getAllTasks(): Promise<TaskModel[]> {
    const tasksData: TaskModel[] = await TaskModel.find().exec();
    return tasksData.map((taskData) => this.convertToTaskModel(taskData));
  }

  async getTaskById(taskId: string): Promise<TaskModel | null> {
    const taskData: TaskModel | null = await TaskModel.findById(taskId).exec();
    return taskData ? this.convertToTaskModel(taskData) : null;
  }

  async createTask(params: { title: string, completed: boolean }): Promise<TaskModel> {
    const task = new TaskModel({
      title: params.title,
      completed: params.completed,
    });
    return task.save();
  }

    async updateTask(task: TaskModel): Promise<TaskModel | null> {
      const isOk = await TaskModel.findByIdAndUpdate(task._id, task, { new: true }).exec();
      if(isOk){
        const taskModel = await this.getTaskById(task._id)
        if(taskModel){
          return this.convertToTaskModel(taskModel)
        }
      }
      return null
    }

    async removeTask(id: string): Promise<{ok:string, error:boolean}> {
      const isOk = await TaskModel.findByIdAndDelete(id).exec();
      if(isOk){
        return {
          ok: 'true',
          error:false
        }
      }
      return {
          ok: 'false',
          error:true
        }
      }
    
}
