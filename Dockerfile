# node version using
FROM node:16

# directory which holds application
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# bundle app for docker image

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]

