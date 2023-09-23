import { Elysia, t } from "elysia";
import { routeTask } from "./api/rest/task/interface/route";
import { swaggerDocumentation } from "./swagger.doc";
import { routeAuth } from "./api/rest/user/interface/route";
import { jwtAuth } from "./utils/jwt";

const app = new Elysia({

})
  .use(swaggerDocumentation)
  .use( jwtAuth )
  .use( routeAuth ) 
  .use( routeTask )
  
  .listen({
    port: process.env.PORT ?? 3001 ,
  });
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// console.log(t)

