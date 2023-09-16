// infrastructure/task.model.mongo.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
