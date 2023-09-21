import { Document, Schema } from "mongoose";
import mongoose from "../../task/infrastructure/database/connect";

export interface UserDocument extends Document {
  name?: string;
  username: string;
  password: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String},
  username: { type: String, required:true, unique: true },
  password: { type: String, required: true },
});

export const UserModelSchema = mongoose.model<UserDocument>('users', UserSchema);
