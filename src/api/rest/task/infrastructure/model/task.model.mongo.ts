import { Document, Schema } from "mongoose";
import mongoose from "../database/connect";

export interface TaskDocument extends Document {
  title: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const TaskModelSchema = mongoose.model<TaskDocument>('task', TaskSchema);
