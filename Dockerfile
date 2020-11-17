FROM node:11.11.0

WORKDIR /usr/src/agenda

# * accounts for both package.json and package-lock
COPY package*.json .

RUN npm install

COPY . .

# specified in app.js port variable
EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]