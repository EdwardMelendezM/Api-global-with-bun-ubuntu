import { password } from "bun";
import { UserModel } from "../domain/user.model";
import { UserRepository } from "../domain/user.repository";
import { UserModelSchema } from "./user.model.mongo";


export class MongoUserRepository extends UserRepository {

  async register(params:UserModel, jwt: any): Promise<{token:string, error:boolean}> {
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
        return {
          token: 'El usuario ya existe!!',
          error: true
        }
      }

      const token = await jwt.sign({ createdOk })
      return {
        token,
        error: false,
      }
    } catch (error) {
      throw error;
    }
  }

  async login(params: UserModel, jwt: any): Promise<{ token: string, error: boolean }> {
    try {
      const { username, password } = params
      const existUser = await UserModelSchema.findOne({
        username
      }).exec();
      
      if (!existUser){
        return {
          token: "El usuario no fue encontrado" ,
          error: true
        }
      }
      const passwordHashed = existUser.password
      const isCorrectPassword = await Bun.password.verify(password, passwordHashed)
      if (!isCorrectPassword){
        return { 
          token: "Contrasenia incorrecta",
          error: true
        }
      }
      const token = await jwt.sign({ existUser })
      
      return { 
        token: token,
        error: false
      }
    } catch (error) {
      throw error;
    }
  }
  
}
