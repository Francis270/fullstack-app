FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npx prisma generate
CMD [ "npm", "start" ]