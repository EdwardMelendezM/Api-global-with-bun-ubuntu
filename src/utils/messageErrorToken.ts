import { TaskTypeResponse } from "../api/rest/task/d.type";

export const errorToken = (ctx: any): TaskTypeResponse | void => {
  if (!ctx.user) {
    ctx.set.status = 401;
    return {
      data: null,
      error: true,
      res: "Don't has token authorization"
    };
  }
  return 
}