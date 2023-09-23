FROM oven/bun

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["bun","dev"]
