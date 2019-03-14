FROM node:latest

RUN mkdir /app
WORKDIR /app
COPY . .
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

EXPOSE 3000

CMD ["npm", "start"]
