FROM node:22-alpine

WORKDIR /usr/src/app

COPY ./dist ./dist
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["node", "dist/main.js"]