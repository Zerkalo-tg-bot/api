FROM node:22-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY nest-cli.json ./
COPY tsconfig*.json ./

COPY prisma ./prisma              
RUN npx prisma generate 

COPY src ./src

CMD ["npm", "run", "start:dev"]