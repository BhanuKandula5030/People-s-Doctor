# which containter are going to use or which application you wanna run
FROM node:16.14.2

#2 specify woking directory can be any
WORKDIR /usr/src/app

# first for installing depencies
COPY package*.json .

# to install dependencies, can also use npm install
RUN npm ci

# then copy all remaining files to current working directory specify #2; node modules will not be copied as 
# like .gitignore that folder is mentioned
COPY . .

EXPOSE 4000 
# what would you like to do? me: starting the app
CMD node /usr/src/app/server.js