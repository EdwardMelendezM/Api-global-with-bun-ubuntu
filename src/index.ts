import { Elysia} from "elysia";
import { routeTask } from "./api/rest/task/interface/route";
import { swaggerDocumentation } from "./swagger.doc";
import { routeAuth } from "./api/rest/user/interface/route";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(swaggerDocumentation)
  
  .use( routeAuth )
  .use( routeTask )
  
  .listen({
    port: process.env.PORT ?? 3001
  });
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


