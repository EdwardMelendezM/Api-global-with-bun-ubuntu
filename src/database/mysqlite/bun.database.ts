import { Database } from "bun:sqlite";

export enum BunType {
  PLAIN = "Plain"
}

export interface Bun {
  id: string,
  type: BunType
}

export default class BunDatabase {
  db: Database

  constructor() {
    this.db = new Database("dbbuns.sqlite")
    this.db.run(
      "CREATE TABLE IF NOT EXISTS buns (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT)"
    )
  }

  getBuns(): Bun[] {
    return this.db.query("SELECT * FROM buns").all() as Bun[]
  }

  getBun(id: string): Bun {
    return this.db.query("SELECT * FROM buns WHERE id=$id")
      .get({
        $id: id
      }) as Bun
  }

  createBun(bunType: BunType) {
    this.db.run("INSERT INTO buns (type) VALUES (?) ", bunType)
  }

  updateBun(bun: Bun) {
    this.db.run("UPDATE buns SET type=? WHERE id=?", [bun.type, bun.id])
  }

  deleteBUn(id: string) {
    this.db.run("DELETE FROM buns WHERE iD=?", id)
  }
}