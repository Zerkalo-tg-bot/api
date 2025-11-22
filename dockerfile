FROM node:22-alpine 

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY src ./src

CMD ["npm", "run", "start:dev"]