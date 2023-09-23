import { UserModel } from "./user.model";

export abstract class UserRepository {
  abstract login(userModel: UserModel, jwt: any): Promise<{token: string}>;
  abstract register(userModel: UserModel, jwt: any): Promise<{ token: string }>;
}
