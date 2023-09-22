import { Elysia } from "elysia";
import { routeTask } from "./api/rest/task/interface/route";
import { swaggerDocumentation } from "./swagger.doc";
import { routeAuth } from "./api/rest/user/interface/route";
import { jwtAuth } from "./utils/jwt";



const app = new Elysia()
  .use( jwtAuth )
  .use( swaggerDocumentation )
  .use( routeTask )
  .use( routeAuth ) 
  .listen( 3000 );
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

