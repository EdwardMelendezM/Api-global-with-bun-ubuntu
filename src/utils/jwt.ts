import jwt from "@elysiajs/jwt";

export const jwtAuth = jwt({
  name: 'jwt',
  secret: process.env.SECRET_JWT_SS!
})