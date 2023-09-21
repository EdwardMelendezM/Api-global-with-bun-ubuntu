import { password } from "bun";
import { UserModel } from "../domain/user.model";
import { UserRepository } from "../domain/user.repository";
import { UserModelSchema } from "./user.model.mongo";


export class MongoUserRepository extends UserRepository {

  async register(params:UserModel): Promise<{token:string}> {
    try {
      const {password,...data} = params
      const passwordHashed = await Bun.password.hash(password)
      const newUser = new UserModelSchema({
        username: data.username,
        password: passwordHashed,
        name: data?.name,

      });
      
      const createdOk = await newUser.save();
      if(!createdOk){
        throw 'El usuario ya existe';
      }
      return { token: 'token' }
    } catch (error) {
      throw error;
    }
  }

  async login(params: UserModel): Promise<{ token: string }> {
    try {
      const { username, password } = params
      const existUser = await UserModelSchema.findOne({
        username
      }).exec();
      
      if (!existUser){
        return { token :"El usuario no fue encontrado" }
      }

      const passwordHashed = existUser.password

      const isCorrectPassword = await Bun.password.verify(password, passwordHashed)
      if (!isCorrectPassword){
        return { token: "Contrasenia incorrecta" }
      }
      return { token: '' }
    } catch (error) {
      throw error;
    }
  }
  
}
