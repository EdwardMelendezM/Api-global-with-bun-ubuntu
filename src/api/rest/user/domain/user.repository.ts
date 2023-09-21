import { UserModel } from "./user.model";

export abstract class UserRepository {
  abstract login(userModel: UserModel): Promise<{token: string}>;
  abstract register(userModel: UserModel): Promise<{ token: string }>;
}
