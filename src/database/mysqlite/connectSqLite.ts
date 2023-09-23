import BunDatabase, {Bun,BunType} from "./bun.database";

export default class BunService{
  db:BunDatabase

  constructor(db:BunDatabase){
    this.db=db
  }


  getBuns(){
    return this.db.getBuns()
  }
  getBun(id: string){
    return this.db.getBun(id)
  }
  createByb(type:BunType){
    this.db.createBun(type)
  }
  updateBun(bun: Bun){
    this.db.updateBun(bun)
  }
  daleteBun(id: string){
    this.db.deleteBUn(id)
  }
} 