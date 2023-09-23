import { TaskEntity } from "./domain/model/task.entity"

export interface TaskTypeResponse {
  data: TaskEntity[] | TaskEntity | null,
  error: boolean
  res: string | null
}