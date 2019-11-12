FROM node:8-alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081 9229

CMD ["npm", "start"]
