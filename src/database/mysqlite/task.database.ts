import { Database } from "bun:sqlite";

export interface Task {
  id: string; 
  title: string;
  completed: boolean;
}

export interface TaskCreate extends Omit<Task,'id'>{}

export default class TaskDatabase {
  db: Database

  constructor() {
    this.db = new Database("unsaac-db.sqlite")
    this.db.run(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, completed INTEGER NOT NULL)"
    )
  }

  getTasks(): Task[] {
    return this.db.query("SELECT * FROM tasks").all() as Task[]
  }

  getTask(id: string): Task {
    return this.db.query("SELECT * FROM tasks WHERE id=$id")
      .get({
        $id: id
      }) as Task
  }

  createTask(task: TaskCreate) {
    this.db.run("INSERT INTO tasks (title, completed) VALUES (?,?) ", [task.title,task.completed ? 1 : 0])
  }

  updateTask(task: Task) {
    this.db.run("UPDATE tasks SET title=?, completed=? WHERE id=?", [task.title, task.completed ? 1 : 0, task.id]);
  }

  deleteTask(id: string) {
    this.db.run("DELETE FROM task WHERE iD=?", [id])
  }
}